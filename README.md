# Quadtree-es6
Simple Javascript ES6 implementation of a quadtree

Based on https://github.com/silflow/quadtree-javascript


### Creation ###
```javascript
let bounds = new Quad(new Point(0,0), 500, 500)
let maxObjects = 5
let maxDepth = 5

let tree = new QuadTree(bounds, maxObjects, maxDepth)


```

### Insertion & Clearing ###
Objects inserted must contain a point, other properties are optional.
```javascript
tree.insert({
  point: new Point(10, 10),
  exampleProp: { someField: 'someValue' }
});

// removes all objects from the tree
tree.clear()
```

### Querying ###
Returns an array of objects contained in the query rectangle. 
Optionally takes a key for the property you want to return and a callback. By default the whole object is returned.

```javascript
let query = new Quad(new Point(0, 0), 200, 200)

tree.queryRange(query, 'exampleProp', pointsInRange => {
  // do something with the result
})

let pointsInRange = tree.queryRange(query)

```
