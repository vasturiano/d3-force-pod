# d3-force-pod

[![NPM](https://nodei.co/npm/d3-force-pod.png?compact=true)](https://nodei.co/npm/d3-force-pod/)

Component that runs a D3 force simulation and automatically draws circles/lines to an SVG canvas according to a configurable set of nodes, links and forces.

Nodes are prevented from escaping by hard-limiting the coordinates to the dimensions of the canvas.

## Quick start

```
import d3ForcePod from 'd3-force-pod';
```
or
```
d3ForcePod = require('d3-force-pod');
```
or even
```
<script src="//unpkg.com/d3-force-pod/dist/d3-force-pod.min.js"></script>
```
then
```
d3ForcePod()
    .genNodes()
    .addForce(d3.forceManyBody())
    (<myDOMElement>);
```

## API reference

| Method | Description | Default |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------- | ------------- |
| <b>nodes</b>([<i>array</i>]) | Getter/setter for the list of nodes. Each node should be an object with the following optional properties: `{ x, y, vx, vy, r }`. | [] |
| <b>links</b>([<i>array</i>]) | Getter/setter for the list of lines to draw between node pairs. Each link should follow the syntax: `[<node index>, <node index>]`. | [] |
| <b>genNodes</b>([<i>object</i>]) | Convenience method to randomly generate nodes. Input options and defaults: ```
{ 
    density: 0.00025,                   // nodes/px
    xRange: [0, window.innerWidth],     // px
    yRange: [0, window.innerHeight],    // px
    radiusRange: [1, 18],               // px
    velocityRange: [0, 4],              // px/tick
    velocityAngleRange: [0, 360]        // 0=right, 90=down
}
```. ||
| <b>addForce</b>([<i>fn</i>]) | Method to register a D3 force in the system. ||