# btknodejs-data-pipeline

Gets list of currency data from oanda api in parallel and saves result. Result location is `C:/myData/nodejs` for windows and `/myData/nodejs` for linux.

# How to run
* Have typescript installed. `npm i typescript -g`
* Run install `npm i`
* Compile typescript from src directory with `tsc`. This will create dist directory.
* Go to dist/bin and run `node generate.js`

# Files
### /src
**tsconfig.json** - typescript compiler settings
**iteration.ts** - function that determines start and end iteration index for each worker
**interface.ts** - data types
**constants.ts** - oanda api constants
**class.ts** - Instrument class
### /src/tasks
**data.ts** - starts data worker tasks and saves result to file
**data.worker.ts** - gets a list of currencies for oanda api and return result to main thread
**file.ts** - helper functions for reading and writing to file
### /src/bin
**generate.ts** - main entry point for data task


