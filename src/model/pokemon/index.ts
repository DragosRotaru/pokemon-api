import { PokemonType, PokemonTypeValue } from "../pokemon-type";
import { NaturalNumber } from "../natural-number";
import { NonEmptyString } from "../non-empty-string";
import { JSONObject } from "../json";

export interface PokemonCSVRow {
  "#": string;
  Name: string;
  "Type 1": string;
  "Type 2": string;
  Total: string;
  HP: string;
  Attack: string;
  Defense: string;
  "Sp. Atk": string;
  "Sp. Def": string;
  Speed: string;
  Generation: string;
  Legendary: string;
}

export class Pokemon {
  number: NaturalNumber;
  name: NonEmptyString;
  typeOne: PokemonType;
  typeTwo?: PokemonType;
  total: NaturalNumber;
  hp: NaturalNumber;
  attack: NaturalNumber;
  defense: NaturalNumber;
  specialAttack: NaturalNumber;
  specialDefense: NaturalNumber;
  speed: NaturalNumber;
  generation: NaturalNumber;
  legendary: boolean;
  constructor(props: PokemonCSVRow) {
    if (props["Type 1"] === props["Type 2"])
      throw new Error("Pokemon cannot have same type for Type 1 and Type 2");
    this.number = new NaturalNumber(Number(props["#"]));
    this.name = new NonEmptyString(props.Name);
    this.typeOne = new PokemonType(props["Type 1"]);
    this.typeTwo = NonEmptyString.is(props["Type 2"])
      ? new PokemonType(props["Type 2"])
      : undefined;
    this.total = new NaturalNumber(Number(props.Total));
    this.hp = new NaturalNumber(Number(props.HP));
    this.attack = new NaturalNumber(Number(props.Attack));
    this.defense = new NaturalNumber(Number(props.Defense));
    this.specialAttack = new NaturalNumber(Number(props["Sp. Atk"]));
    this.specialDefense = new NaturalNumber(Number(props["Sp. Def"]));
    this.speed = new NaturalNumber(Number(props.Speed));
    this.generation = new NaturalNumber(Number(props.Generation));
    if (props.Legendary === "True") this.legendary = true;
    else if (props.Legendary === "False") this.legendary = false;
    else throw new Error("Legendary parameter must be ");
  }
  isType(type: PokemonTypeValue): boolean {
    return this.typeOne.val === type || this.typeTwo?.val === type;
  }
  get serialized(): JSONObject {
    return {
      number: this.number.val,
      name: this.name.val,
      typeOne: this.typeOne.val,
      typeTwo: this.typeTwo?.val || null,
      total: this.total.val,
      hp: this.hp.val,
      attack: this.attack.val,
      defense: this.defense.val,
      specialAttack: this.specialAttack.val,
      specialDefense: this.specialDefense.val,
      speed: this.speed.val,
      generation: this.generation.val,
      legendary: this.legendary,
    };
  }
}
