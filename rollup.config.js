import nodeResolve from 'rollup-plugin-node-resolve';
import commonJs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';

export default {
    input: 'src/index.js',
    output: [
        {
            format: 'umd',
            name: 'd3ForcePod',
            file: 'dist/d3-force-pod.js',
            sourcemap: true
        },
        {
            format: 'es',
            file: 'dist/d3-force-pod.mjs'
        }
    ],
    plugins: [
        nodeResolve(),
        commonJs(),
        babel({
            presets: [
                ["es2015", { "modules": false }]
            ],
            plugins: ["external-helpers"],
            babelrc: false
        })
    ]
};