import {parsedDomToJson} from './parsed-dom-to-json'

interface Node {
  [key: string]: any
}

interface Parser {
  [key: string]: (nodes: Node[]) => object
}

const standardParser: Parser = {
  title: (nodes: Node[]) => ({
    title: nodes[0].textContent
  }),
  link: (nodes: Node[]) => ({
    link: nodes[0].textContent
  }),
  description: (nodes: Node[]) => ({
    description: nodes[0].textContent
  }),
  item: (nodes: Node[]) => ({
    items: nodes.map(node => ({
      title: node.title[0].textContent,
      description: node.description[0].textContent,
    }))
  })
}

export const parser = (domParser: DOMParser) => (rss: string, customParser: Parser = {}) => {
  const dom = domParser.parseFromString(rss, 'text/xml')
  const channels = dom.getElementsByTagName('channel')
  const jsonStructure = parsedDomToJson(channels[0].childNodes)
  const mergedParsers = Object.assign({}, standardParser, customParser)
  const result: any = {}

  for (const key in mergedParsers) {
    if (jsonStructure.hasOwnProperty(key)) {
      const parserFunction = mergedParsers[key]
      Object.assign(result, parserFunction(jsonStructure[key]))
    }
  }

  return result
}

export const createParser = (DOMParser: DOMParser) => {
  // @ts-ignore
  const domParser: DOMParser = new DOMParser()
  return parser(domParser)
}
