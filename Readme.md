# Pt. 1 --> Node Abstraction

## Overview

I refactored the node system into a config-driven architecture to reduce duplication and make new nodes easier to create.

### Architecture

```txt
Config → nodeFactory → BaseNode → React Flow Node
```

* **BaseNode**: shared node layout, styling, and handle rendering
* **fieldRenderers**: registry for rendering field types (`text`, `select`, `number`, etc.)
* **nodeFactory**: converts a node configuration into a working React component
* **configs/**: declarative definitions of node titles, fields, and handles

### Benefits

* Shared styling and handle logic are defined once
* New node types can be added through configuration
* New field types can be added without modifying existing node logic
* Custom nodes can still be built directly on `BaseNode` when needed

### Added Nodes

* API Node
* Math Node
* Filter Node
* Delay Node
* Conditional Node

### Example

```js
export const delayConfig = {
  title: "Delay",
  fields: [
    {
      key: "seconds",
      kind: "number"
    }
  ],
  handles: [...]
};
```

Registering the node:

```js
delay: createNode(delayConfig)
```

No changes are required in `BaseNode` or `nodeFactory`.

### Additional Fix

Fixed an inconsistency in `OutputNode` where the displayed label was "Image" but the stored value was `"File"`.

