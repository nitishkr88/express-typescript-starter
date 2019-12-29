import jsonfile from 'jsonfile'
import path from 'path'

import tsconfig from '../tsconfig.json'

const content: any = tsconfig
content.compilerOptions.outDir = '.tmp'
content.include = ['src/**/*']

const filePath = path.join(process.cwd(), 'tsconfig.build.json')
jsonfile.writeFile(filePath, content, { spaces: 2 }, err => {
  if (err === null) {
    process.exit(0)
  } else {
    console.error('Failed to generate tsconfig.build.json', err)
    process.exit(1)
  }
})
