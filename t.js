let edges = [
    ['14th&6th', '23rd&6th'],
    ['23rd&6th', '34th&6th'],
    ['34th&6th', '28th&Bwy'],
    ['28th&Bwy', '23rd&Bwy'],
    ['23rd&Bwy', '14th&Lex'],
    ['14th&Lex', '23rd&Lex']
]
 
let vertices = [
  {name: '34th&6th', distance: null, predecessor: null},
  {name: '23rd&6th', distance: null, predecessor: null},
  {name: '14th&6th', distance: null, predecessor: null},
  {name: '28th&Bwy', distance: null, predecessor: null},
  {name: '23rd&Bwy', distance: null, predecessor: null},
  {name: '14th&Lex', distance: null, predecessor: null},
  {name: '23rd&Lex', distance: null, predecessor: null},
]

function bfs(rootNode, vert, edges) {
  // Set the root distance to 0
  rootNode.distance = 0

  // initialize our queue and order of search
  let queue = [rootNode]
  let order = [rootNode]

  // Begin the search
  while (queue.length > 0) {
      let node = queue.shift()
      let adjacent = findAdjacent(node.name, vert, edges)

      // add found to our final list in the order we get them
      order = order.concat(adjacent)

      // mark where we have been
      markDistanceAndPredecessor(node, adjacent)

      // add to queue
      queue = queue.concat(adjacent)
  }

  return order
}

function dfs(rootNode, vert, edges) {
  rootNode.distance = 0
  let stack = [rootNode]
  let found = [rootNode]
  
  while (stack.length > 0) {
    let node = stack.shift()
    let adj = findAdjacent(node.name, vert, edges)
    
    if (adj.length == 0) {
      continue
    }
    
    found = found.concat(adj)
    markDistanceAndPredecessor(node, adj)
    stack = stack.concat(adj)
    
  }
}

function findAdjacent(street, vert, edges) {
  return edges
          .filter(edge => edge.includes(street))
          .map(edge => edge.filter(node => node != street)[0])
          .map(name => findNode(name, vert))
          .filter(node => node.distance == null)
}

function markDistanceAndPredecessor(pre, adjacents) {
  adjacents.map(node => {
    node.distance = pre.distance + 1
    node.predecessor = pre
  })
}

function findNode(street, vertices) {
  return vertices.find(vert => vert.name == street)
}
