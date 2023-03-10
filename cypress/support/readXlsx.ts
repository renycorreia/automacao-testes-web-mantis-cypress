import fs = require('fs')
import XLSX = require('xlsx')

const read = ({ file, sheet }): any => {
  const buf = fs.readFileSync(file)
  const workbook = XLSX.read(buf, { type: 'buffer' })
  const rows = XLSX.utils.sheet_to_json(workbook.Sheets[sheet])
  return rows
}

module.exports = {
  read
}
