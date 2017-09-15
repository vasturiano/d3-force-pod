# d3-force-pod

[![NPM](https://nodei.co/npm/d3-force-pod.png?compact=true)](https://nodei.co/npm/d3-force-pod/)

Component that runs a D3 force simulation and automatically draws circles/lines to an SVG canvas according to a configurable set of nodes, links and forces.

Nodes are prevented from escaping by hard-limiting the coordinates to the boundaries of the canvas.

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
| <b>width</b>([<i>number</i>]) | Getter/setter for the canvas width. | window.innerWidth |
| <b>height</b>([<i>number</i>]) | Getter/setter for the canvas height. | window.innerHeight |
| <b>nodes</b>([<i>array</i>]) | Getter/setter for the list of nodes. Each node should be an object with the following optional properties: `{ x, y, vx, vy, r }`. | [] |
| <b>links</b>([<i>array</i>]) | Getter/setter for the list of lines to draw between node pairs. Each link should follow the syntax: `[<node index>, <node index>]`. | [] |
| <b>genNodes</b>([<i>object</i>]) | Convenience method for randomly generating nodes. See below for input options and defaults. ||
| <b>addForce</b>(<i>fn</i>) | Method to register a D3 force in the system. ||
| <b>simulation</b>() | Getter for the underlying simulation object. Can be used as an escape hatch to modify simulation parameters such as alphaDecay. | d3.forceSimulation().alphaDecay(0).velocityDecay(0) |
| <b>nodeColor</b>([<i>string</i> or <i>fn</i>]) | Getter/setter for the color accessor of the node circles | #900C3F |
| <b>linkColor</b>([<i>string</i> or <i>fn</i>]) | Getter/setter for the color accessor of the link lines | #00008B |

#### genNodes(<i>options</i>) defaults:

```
{
    density: 0.00025,             // nodes/px
    xRange: [0, width],           // px
    yRange: [0, height],          // px
    radiusRange: [1, 18],         // px
    velocityRange: [0, 4],        // px/tick
    velocityAngleRange: [0, 360]  // 0=right, 90=down
}
```