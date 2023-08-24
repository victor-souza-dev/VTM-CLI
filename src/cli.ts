import { build } from 'gluegun'

async function run(argv) {
  const cli = build()
    .brand('vtm')
    .src(__dirname)
    .plugins('./node_modules', { matching: 'vtm-*', hidden: true })
    .help()
    .version()
    .create()

  const toolbox = await cli.run(argv)

  return toolbox
}

module.exports = { run }
