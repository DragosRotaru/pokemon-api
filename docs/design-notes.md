# Design Decisions

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
