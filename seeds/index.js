import fs from 'fs'
import { createConnection } from 'typeorm'
import { User } from 'entity/User'
import { Role } from 'entity/Role'

;(async () => {
  await createConnection({
    type: 'postgres',
    host: 'database',
    port: 5432,
    username: 'postgres',
    password: 'password',
    database: 'boilerplate_db',
    entities: ['src/entity/*.js']
  })

  const files = fs.readdirSync('./seeds/files')
  const seedsFiles = files.map(async seed => await import(`./files/${seed}`))
  const importedSeeds = await Promise.all(seedsFiles)

  const seeds = importedSeeds.map(seedFn => seedFn.default)

  await Promise.all(seeds.map(seed => seed()))
})()
