interface Node {
  [key: string]: string|Node[]
}

interface Container {
  [key: string]: Array<Node>
}

const isElementNode = (type: number) => type === 1

const hasChildNodes = (lengthOfChildNodes: number) => lengthOfChildNodes > 1

const extractNode = (node: ChildNode) => {
  const element: Node = (node.textContent) ? {textContent: node.textContent} : {}

  // @ts-ignore, attributes are missing in ts
  for (const attr of node.attributes) {
    element[attr.nodeName] = attr.nodeValue
  }

  return element
}

const createContainer = (): Container => ({})

const addEmptyArrayProxy = (container: Container) => {
  return new Proxy(container, {
    get: (target, property: string) => {
      if (!Array.isArray(target[property])) {
        target[property] = []
      }
      return target[property]
    }
  })
}

const parsedDomToJson = (nodes: NodeListOf<ChildNode>) => {
  const container = createContainer()
  const containerWithProxy = addEmptyArrayProxy(container)

  for (const node of nodes) {
    if (isElementNode(node.nodeType)) {
      const element = hasChildNodes(node.childNodes.length) ?
        parsedDomToJson(node.childNodes) :
        extractNode(node)

      containerWithProxy[node.nodeName].push(element)
    }
  }

  return container
}

export const parser = (domParser: DOMParser) => (rss: string) => {
  const dom = domParser.parseFromString(rss, 'text/xml')
  const channels = dom.getElementsByTagName('channel')

  const jsonStructure = parsedDomToJson(channels[0].childNodes)

  // TD map json structure to simple json rss
  console.log(jsonStructure)
}

export const createParser = (DOMParser: DOMParser) => {
  // @ts-ignore
  const domParser: DOMParser = new DOMParser()
  return parser(domParser)
}
