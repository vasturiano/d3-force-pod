import Kapsule from 'kapsule';
import { forceSimulation } from 'd3-force';
import { range } from 'd3-array';
import { select } from 'd3-selection';
import forceLimit from 'd3-force-limit';

const d3 = { forceSimulation, range, select };

const DEFAULT_R = 4;

export default Kapsule({
  props: {
    width: { default: window.innerWidth },
    height: { default: window.innerHeight },
    nodes: {
      default: [],
      triggerUpdate: false,
      onChange(nodes, state) {
        state.forceSim.nodes(nodes);
      }
    },
    links: { default: [], triggerUpdate: false },
    nodeColor: { default: '#900C3F', triggerUpdate: false },
    linkColor: { default: '#00008B', triggerUpdate: false }
  },

  methods: {
    genNodes: function (state, config) {
      return this.nodes(genNodes(config));

      //

      function genNodes({
        density = 0.00025,
        xRange = [0, state.width],
        yRange = [0, state.height],
        radiusRange = [1, 18],
        velocityRange = [0, 4],
        velocityAngleRange = [0, 360]
      } = {}) {
        const numParticles = Math.round(state.width * state.height * density);

        return d3.range(numParticles).map(() => {
          const angle = Math.random() * (velocityAngleRange[1] - velocityAngleRange[0]) + velocityAngleRange[0] * Math.PI/180,
            velocity = Math.random() * (velocityRange[1] - velocityRange[0]) + velocityRange[0];

          return {
            x: Math.random() * (xRange[1] - xRange[0]) + xRange[0],
            y: Math.random() * (yRange[1] - yRange[0]) + yRange[0],
            vx: Math.cos(angle) * velocity,
            vy: Math.sin(angle) * velocity,
            r: Math.round(Math.random() * (radiusRange[1] - radiusRange[0]) + radiusRange[0])
          }
        });
      }
    },
    addForce: function(state, forceFunc) {
      state.forceSim.force(Math.random(), forceFunc);

      // keep walls force as last
      const wallsForce = state.forceSim.force('walls');
      state.forceSim.force('walls', null);
      state.forceSim.force('walls', wallsForce);

      return this;
    },
    simulation: function(state) {
      return state.forceSim;
    }
  },

  stateInit: {
    forceSim: d3.forceSimulation()
      .alphaDecay(0)
      .velocityDecay(0)
      .nodes([])
  },

  init(domElem, state) {
    // Wipe DOM
    domElem.innerHTML = '';

    state.svg = d3.select(domElem).append('svg')
      .style('display', 'block');

    const elLines = state.svg.append('g');
    const elParticles = state.svg.append('g');

    state.forceSim
      .on('tick', () => {
        const nodes = state.forceSim.nodes();

        // Draw particles
        let particle = elParticles.selectAll('circle')
          .data(nodes);

        particle.exit().remove();

        particle.merge(
          particle.enter().append('circle')
        )
          .attr('fill', state.nodeColor)
          .attr('r', d => d.r || DEFAULT_R)
          .attr('cx', d => d.x)
          .attr('cy', d => d.y);

        // Draw lines
        let line = elLines.selectAll('line')
          .data(state.links
            .map(l => [l.source, l.target])
            .map(l => l.map(nIdx => isNaN(nIdx) ? nIdx : nodes[nIdx]))
          );

        line.exit().remove();

        line.merge(
          line.enter().append('line')
            .attr('stroke-width', '1.5px')
            .attr('stroke-opacity', .4)
        )
          .attr('stroke', state.linkColor)
          .attr('x1', d => d[0].x)
          .attr('y1', d => d[0].y)
          .attr('x2', d => d[1].x)
          .attr('y2', d => d[1].y);
      })
      // limit nodes inside container
      .force('walls', forceLimit()
        .radius(node => node.r || DEFAULT_R)
        .x0(0)
        .x1(() => state.width)
        .y0(0)
        .y1(() => state.height)
      );
  },

  update(state) {
    state.svg
      .attr('width', state.width)
      .attr('height', state.height);
  }
});