const esbuild = require('esbuild')
const sveltePlugin = require('esbuild-svelte')

const args = process.argv.slice(2)
const mode = args.length > 0 ? args[0].trim() : 'prod'
const watcher = require('chokidar')
    .watch('.', {ignored: /[\/\\]\.|^public.*|^node_modules.*/})
    .on('change', function(event, path) {
        build()
    })

function build(mode) {
    const dev = mode === 'dev'

    esbuild.build({
        entryPoints: ['src/index.js'],
        bundle: true,
        outfile: 'public/dist/bundle.js',
        minify: !dev ? true : false,
        sourcemap: !dev ? true : false,
        plugins: [
            sveltePlugin({
                compileOptions: { css: true }
            })
        ],
        logLevel: 'info',
    })
}

build()