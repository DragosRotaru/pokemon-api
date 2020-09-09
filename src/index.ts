import fs from "fs";
import path from "path";
import express from "express";
import morgan from "morgan";
import * as csv from "fast-csv";
import { Pokemon, NaturalNumber, WholeNumber } from "./model";
import { compose, levenshtein } from "./utils";
import {
  excludeLegendary,
  excludeGhost,
  doubleSteelHP,
  lowerFireAttack,
  increaseBugAndFlyingAttack,
  increaseLetterGDefense,
} from "./transformations";

// Our "Repository" and "Database" - simplicity is our friend :)
let pokedex: Pokemon[] = [];

fs.createReadStream(path.join(__dirname, "../data/pokemon.csv"))
  .pipe(csv.parse({ headers: true }))
  .on("error", (error) => console.error(error))
  .on("data", (row) => {
    try {
      pokedex.push(new Pokemon(row));
    } catch (error) {
      console.error(
        `pokemon parsing error: "${
          error.message
        }" occured on the following pokemon row:\n${JSON.stringify(
          row,
          null,
          2
        )}`
      );
    }
  })
  .on("end", (rowCount: number) => {
    console.log(
      `${pokedex.length} of ${rowCount} pokemon parsed successfully.`
    );
    if (pokedex.length < rowCount) {
      console.error(
        new Error(
          "Please fix all errors in the pokemon csv file before restarting the server."
        )
      );
      return;
    }

    // Apply data transformations
    pokedex = compose(
      excludeLegendary,
      excludeGhost,
      doubleSteelHP,
      lowerFireAttack,
      increaseBugAndFlyingAttack,
      increaseLetterGDefense
    )(pokedex);

    const port = process.env.PORT || 8000;
    const app = express();

    // Logging middleware
    app.use(morgan("tiny"));

    // API endpoint
    app.get("/pokemon", (req, res) => {
      try {
        let result: Pokemon[] = pokedex;

        // Filter
        const filters = {
          lt: (a: number, b: number) => a < b,
          lte: (a: number, b: number) => a <= b,
          eq: (a: number, b: number) => a === b,
          gte: (a: number, b: number) => a >= b,
          gt: (a: number, b: number) => a > b,
        } as const;

        const getFilter: (obj: {
          [key: string]: any;
        }) => (a: number) => boolean = (obj) => {
          if (obj.lt) return (val) => filters.lt(val, Number(obj.lt));
          if (obj.lte) return (val) => filters.lte(val, Number(obj.lte));
          if (obj.eq) return (val) => filters.eq(val, Number(obj.eq));
          if (obj.gte) return (val) => filters.gte(val, Number(obj.gte));
          if (obj.gt) return (val) => filters.gt(val, Number(obj.gt));
          throw new Error("malformed filter query");
        };

        // Filter by HP
        const hp = req.query.hp;
        if (typeof hp === "string")
          result = result.filter((pokemon) =>
            filters.eq(pokemon.hp.val, Number(hp))
          );
        else if (typeof hp === "object" && !Array.isArray(hp))
          result = result.filter((pokemon) => getFilter(hp)(pokemon.hp.val));

        console.log(hp);
        console.log("Filtered By HP");
        console.log(result);

        // Filter by Attack
        const attack = req.query.attack;
        if (typeof attack === "string")
          result = result.filter((pokemon) =>
            filters.eq(pokemon.attack.val, Number(attack))
          );
        else if (typeof attack === "object" && !Array.isArray(attack))
          result = result.filter((pokemon) =>
            getFilter(attack)(pokemon.attack.val)
          );

        // Filter by Defense
        const defense = req.query.defense;
        if (typeof defense === "string")
          result = result.filter((pokemon) =>
            filters.eq(pokemon.defense.val, Number(defense))
          );
        else if (typeof defense === "object" && !Array.isArray(defense))
          result = result.filter((pokemon) =>
            getFilter(defense)(pokemon.defense.val)
          );

        // Search
        const search =
          typeof req.query.search === "string" ? req.query.search : undefined;

        if (search) {
          result = result.sort(
            (a, b) =>
              levenshtein(search, a.name.val) - levenshtein(search, b.name.val)
          );
        }

        // Pagination
        const DEFAULT_PAGE = new NaturalNumber(1);
        const page =
          typeof req.query.page === "string"
            ? new NaturalNumber(parseInt(req.query.page))
            : DEFAULT_PAGE;

        const DEFAULT_PAGE_SIZE = new NaturalNumber(50);
        const MAX_PAGE_SIZE = new NaturalNumber(1000);
        const pageSize =
          typeof req.query.pagesize === "string"
            ? new NaturalNumber(parseInt(req.query.pagesize))
            : DEFAULT_PAGE_SIZE;

        // Quitely defaults to MAX_PAGE_SIZE if Exceeded
        if (pageSize.val > MAX_PAGE_SIZE.val) pageSize.val = MAX_PAGE_SIZE.val;

        const pageCount = new WholeNumber(
          Math.ceil(result.length / pageSize.val)
        );

        const resultCount = result.length;

        // Pagination out of bounds edge cases are handled implicitly because slice returns empty array
        result = result.slice(
          (page.val - 1) * pageSize.val,
          Math.min(page.val * pageSize.val, result.length)
        );

        // Serialize result
        res.status(result.length > 0 ? 200 : 404).send({
          data: result.map((pokemon) => pokemon.serialized),
          count: resultCount,
          page: page.val,
          pageSize: pageSize.val,
          pageCount: pageCount.val,
        });
      } catch (error) {
        // Malformed Query String
        console.error(error);
        res.status(400).send();
      }
    });

    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  });
