# Design Notes

## Data Model

By investigating the data in excel I was able to figure out the value type constraints:

"#" = Natural Number, Range 1-721, Not Unique
Name = String, Capital Case, Unique, Len 3-25
Type 1 = “Bug” | “Dark” | “Dragon” | “Electric“ | “Fairy” | “Fighting” | “Fire” | “Flying” | “Ghost” | “Grass” | “Ground” | “Ice” | “Normal” | “Poison” | “Psychic” | “Rock” | “Steel” | “Water”
Type 2 = Option<typeof Type1>
Total = Natural Number, Range 180-780
HP = Natural Number, Range 1-255
Attack = Natural Number, Range 5-190
Defense = Natural Number, Range 5 - 230
Special Attack = Natural Number, Range 10-194
Special Defense = Natural Number, Range 20-230
Speed = Natural Number, Range 5-180
Generation = Natural Number, Range 1-6
Legendary = Boolean

I belive pokemon cannot have the same Type for both Type 1 and 2, so I will include that constraint in the model. Constraining the numerical properties to the set of Natural Numbers makes sense, I don't see a big enough benefit to cap them with a min/max; same goes for name length. I think constricting Types 1 and 2 to the Enumeration of the current existing data types makes sense - it is easy to mispell a type when editing the CSV and I doubt updating the code to reflect newly discovered pokemon types will be an issue.

## Decisions

**Decision #1: The data will be stored in-memory and loaded from the pokemon.csv file in the "data" folder at startup.**

- The API is read-only
- The data size is insignificant - 800 rows and 44KB - small enough to store in-memory.
- In-process, In-memory will perform faster than a traditional DB. a purely functional resolver with read-only data also enables memoization!
- Professor Oak evidently knows how to work with CSV files, we do not know how familiar he is with database technologies. He may wish to modify the table in the future - leaving the data in csv format and using git as a versioning system affords him this option with relative ease and minimal training.
- No roadmap has been indicated, so implementing a more complex persistance mechanism has no inherent benefit.
- Code reuse - We have to write CSV parsing code anyway in order to load the file into a database.

**Decision #2: Perform the requested data transformations at startup.**

The intent behind the requirement to transform the data becomes unclear given that the data will not be transfered to another method of persistance (see decision 1). In my opinion, executing the transformations as part of a data migration script rather than at application startup is closer to the original intent behind the requirement, but until this can be confirmed by speaking to the project owner, I will implement it at startup to avoid unecessary work.

**Decision #3: Push directly to master branch**

Normally I like to follow Trunk-Based Development for SVM. Since there are no other collaborators, there is no CI/CD implemented and there were no instructions given with regards to repository ettiquete, I will keep it simple. I will however use Tags to keep track of versions in step with package.json and CHANGELOG.

**Decision #4: Code Strategy**

I've decided to model the Domain OOP style and write everything else in a functional style.
I find this combination to produce the most high fidelity code - it works well with the inherent design of the JavaScript/TypeScript language.

## Further Refinements

- Ambiguous requirements:
  - state mutation asks to make conditional changes with the wording "For Pokémon of Type: Bug & Flying", which is ambiguous. Does it mean Pokemon who posess both these types or pokemon who posess at least one of these types?
  - state mutation asks for increasing defence based on presence of letter **G** in name. It is not clear if this includes the lower-case G.
- We could check for Pokemon Name uniqueness within the data.
- We could write tests for the data and add a pre-commit hook.
- We could use NVM to manage the node version.
- Given the simplicity of this API, I would deploy it serverless with Netlify or Zeit, which also gives us Continuous Deployment and deploy previews for on every branch.
