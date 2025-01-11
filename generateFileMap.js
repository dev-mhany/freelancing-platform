/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs')
const path = require('path')

function generateFileList(dir, fileList = [], prefix = '') {
  const files = fs.readdirSync(dir)

  files.forEach(file => {
    const filePath = path.join(dir, file)
    const stats = fs.statSync(filePath)

    if (stats.isDirectory() && (file === 'node_modules' || file === 'public' || file === '.next' || file === '.git')) {
      return
    }

    if (stats.isDirectory()) {
      fileList.push(`${prefix}${file}/`)
      generateFileList(filePath, fileList, `${prefix}${file}/`)
    } else {
      fileList.push(`${prefix}${file}`)
    }
  })

  return fileList
}

const dirPath = path.resolve(__dirname)
const fileList = generateFileList(dirPath)

fs.writeFileSync('fileMap.txt', fileList.join('\n'), 'utf8')

console.log('File map has been saved to fileMap.txt')
