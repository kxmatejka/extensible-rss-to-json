import fs from 'fs'
import {DOMParser} from 'xmldom'
import {createParser} from './parser'

function main () {
  const rss = fs.readFileSync(__dirname + '/__tests__/mocks/tn_cz.rss').toString()

  const parser = createParser(DOMParser as any)
  const feed = parser(rss)
}

main()
