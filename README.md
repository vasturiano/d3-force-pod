d3-force-pod
==============

[![NPM package][npm-img]][npm-url]
[![Build Size][build-size-img]][build-size-url]
[![NPM Downloads][npm-downloads-img]][npm-downloads-url]

Component that runs a D3 force simulation and automatically draws circles/lines to an SVG canvas according to a configurable set of nodes, links and forces.

Nodes are prevented from escaping by hard-limiting the coordinates to the boundaries of the canvas.

## Quick start

```js
import d3ForcePod from 'd3-force-pod';
```
or
```js
const d3ForcePod = require('d3-force-pod');
```
or even
```html
<script src="//unpkg.com/d3-force-pod/dist/d3-force-pod.min.js"></script>
```
then
```js
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
| <b>links</b>([<i>array</i>]) | Getter/setter for the list of lines to draw between node pairs. Each link should follow the syntax: `{source: <node index or node obj>, target: <node index or node obj>}`. | [] |
| <b>genNodes</b>([<i>object</i>]) | Convenience method for randomly generating nodes. See below for input options and defaults. ||
| <b>addForce</b>(<i>fn</i>) | Method to register a D3 force in the system. ||
| <b>simulation</b>() | Getter for the underlying simulation object. Can be used as an escape hatch to modify simulation parameters such as alphaDecay. | d3.forceSimulation().alphaDecay(0).velocityDecay(0) |
| <b>nodeColor</b>([<i>string</i> or <i>fn</i>]) | Getter/setter for the color accessor of the node circles | #900C3F |
| <b>linkColor</b>([<i>string</i> or <i>fn</i>]) | Getter/setter for the color accessor of the link lines | #00008B |

#### genNodes(<i>options</i>) defaults:

```js
{
    density: 0.00025,             // nodes/px
    xRange: [0, width],           // px
    yRange: [0, height],          // px
    radiusRange: [1, 18],         // px
    velocityRange: [0, 4],        // px/tick
    velocityAngleRange: [0, 360]  // 0=right, 90=down
}
```


[npm-img]: https://img.shields.io/npm/v/d3-force-pod
[npm-url]: https://npmjs.org/package/d3-force-pod
[build-size-img]: https://img.shields.io/bundlephobia/minzip/d3-force-pod
[build-size-url]: https://bundlephobia.com/result?p=d3-force-pod
[npm-downloads-img]: https://img.shields.io/npm/dt/d3-force-pod
[npm-downloads-url]: https://www.npmtrends.com/d3-force-pod
