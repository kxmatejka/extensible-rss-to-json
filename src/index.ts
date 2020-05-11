import fs from 'fs'
import {DOMParser} from 'xmldom'
import {createParser} from './parser'

function main () {
  const rss = fs.readFileSync(__dirname + '/__tests__/mocks/respekt.rss').toString()

  const parser = createParser(DOMParser as any)
  const feed = parser(rss, {
    image: (nodes) => ({
      image: {
        title: nodes[0].title[0].textContent,
        url: nodes[0].url[0].textContent
      }
    })
  })

  console.log(feed)
}

main()
