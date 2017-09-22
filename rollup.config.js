import nodeResolve from 'rollup-plugin-node-resolve';
import commonJs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';

export default {
    entry: 'src/index.js',
    dest: 'dist/d3-force-pod.js',
    format: 'umd',
    moduleName: 'd3ForcePod',
    plugins: [
        nodeResolve({
            jsnext: true,
            main: true
        }),
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