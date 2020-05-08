interface Node {
  [key: string]: string|Node[]
}

interface Container {
  [key: string]: Node[]
}

const isNodeElement = (node: ChildNode) => node.nodeType === 1

const hasNodeChildNodes = (node: ChildNode) => node.childNodes.length > 1

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

export const parsedDomToJson = (nodes: NodeListOf<ChildNode>) => {
  const container = createContainer()
  const containerWithProxy = addEmptyArrayProxy(container)

  for (const node of nodes) {
    if (isNodeElement(node)) {
      const element = hasNodeChildNodes(node) ?
        parsedDomToJson(node.childNodes) :
        extractNode(node)

      containerWithProxy[node.nodeName].push(element)
    }
  }

  return container
}
