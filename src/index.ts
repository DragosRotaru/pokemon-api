import fs from "fs";
import path from "path";
import express from "express";
import morgan from "morgan";
import * as csv from "fast-csv";
import { Pokemon } from "./model";
import {
  compose,
  ExcludeLegendary,
  ExcludeGhost,
  DoubleSteelHP,
  LowerFireAttack,
  IncreaseBugAndFlyingAttack,
  IncreaseLetterGDefense,
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
      ExcludeLegendary,
      ExcludeGhost,
      DoubleSteelHP,
      LowerFireAttack,
      IncreaseBugAndFlyingAttack,
      IncreaseLetterGDefense
    )([]);

    const port = process.env.PORT || 8000;
    const app = express();

    // Logging middleware
    app.use(morgan("tiny"));

    // API endpoint
    app.get("/pokemon", (req, res) => {
      res.status(200).send("ok");
    });

    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  });
