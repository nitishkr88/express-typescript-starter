import chalk from 'chalk'
import ora from 'ora'
import commander from 'commander'
import path from 'path'
import glob from 'glob'
import { runSeeder, setConnection, importSeed } from 'typeorm-seeding'
import {
  createConnection,
  getConnectionOptions,
  ConnectionOptions
} from 'typeorm'

import { env } from '../src/env'

commander
  .version('1.0.0')
  .description('Run database seeds')
  .option('-L, --logging', 'enable sql query logging')
  .option('--factories <path>', 'add filepath for the factories')
  .option('--seeds <path>', 'add filepath for the seeds')
  .parse(process.argv)

const factoryPath = commander.factories
  ? commander.factories
  : 'src/database/factories/**/*{.js,.ts}'

const seedsPath = commander.seeds
  ? commander.seeds
  : 'src/database/seeds/**/*{.js,.ts}'

const run = async () => {
  const log = console.log

  const spinner = ora('Loading orm config').start()

  // Get TypeORM config
  let options: ConnectionOptions
  try {
    const loadedConnectionOptions = await getConnectionOptions()
    options = Object.assign(loadedConnectionOptions, {
      type: env.db.type,
      host: env.db.host,
      port: env.db.port,
      username: env.db.username,
      password: env.db.password,
      database: env.db.database
    })
    spinner.succeed('ORM Config loaded')
  } catch (error) {
    panic(spinner, error, 'Could not load the config!')
  }

  // Find all factories and seed with help of the config
  spinner.start('Import Factories')
  const factoryFiles = loadFiles([factoryPath])
  try {
    importFiles(factoryFiles)
    spinner.succeed('Factories are imported')
  } catch (error) {
    panic(spinner, error, 'Could not import factories!')
  }

  // Show seeds in the console
  spinner.start('Importing Seeders')
  const seedFiles = loadFiles([seedsPath])
  let seedFileObjects = []
  try {
    seedFileObjects = seedFiles.map(seedFile => importSeed(seedFile))
    spinner.succeed('Seeders are imported')
  } catch (error) {
    panic(spinner, error, 'Could not import seeders!')
  }

  // Get database connection and pass it to the seeder
  spinner.start('Connecting to the database')
  try {
    const connection = await createConnection(options)
    setConnection(connection)
    spinner.succeed('Database connected')
  } catch (error) {
    panic(
      spinner,
      error,
      'Database connection failed! Check your typeORM config file.'
    )
  }

  // Run seeds
  for (const seedFileObject of seedFileObjects) {
    spinner.start(`Executing ${seedFileObject.name} Seeder`)
    try {
      await runSeeder(seedFileObject)
      spinner.succeed(`Seeder ${seedFileObject.name} executed`)
    } catch (error) {
      panic(spinner, error, `Could not run the seed ${seedFileObject.name}!`)
    }
  }

  log('👍 ', chalk.gray.underline(`Finished Seeding`))
  process.exit(0)
}

const importFiles = (filePaths: string[]) => filePaths.forEach(require)

const loadFiles = (filePattern: string[]): string[] => {
  return filePattern
    .map(pattern => glob.sync(path.join(process.cwd(), pattern)))
    .reduce((acc, filePath) => acc.concat(filePath), [])
}

const panic = (spinner: ora.Ora, error: Error, message: string) => {
  spinner.fail(message)
  console.error(error)
  process.exit(1)
}

run()
