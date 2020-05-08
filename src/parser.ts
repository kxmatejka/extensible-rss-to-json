import {parsedDomToJson} from './parsed-dom-to-json'

interface Node {
  [key: string]: string | Node[]
}

const standardParser: any = {
  title: (node: Node[]) => ({
    title: node[0].textContent
  }),
  item: (node: Node[]) => ({
    items: node.map(n => ({
      // @ts-ignore
      title: n.title[0].textContent
    }))
  })
}

export const parser = (domParser: DOMParser) => (rss: string, customParser = {}) => {
  const dom = domParser.parseFromString(rss, 'text/xml')
  const channels = dom.getElementsByTagName('channel')

  const jsonStructure = parsedDomToJson(channels[0].childNodes)

  const mergedParsers = Object.assign({}, standardParser, customParser)

  const result: any = {}

  for (const key in mergedParsers) {
    if (jsonStructure.hasOwnProperty(key)) {
      let p = mergedParsers[key]
      Object.assign(result, p(jsonStructure[key]))
    }
  }

  console.log(result)
}

export const createParser = (DOMParser: DOMParser) => {
  // @ts-ignore
  const domParser: DOMParser = new DOMParser()
  return parser(domParser)
}
