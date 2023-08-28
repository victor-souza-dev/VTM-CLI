import { GluegunCommand } from 'gluegun'

const command: GluegunCommand = {
  name: 'config',
  description: 'Configure your project',
  run: async (toolbox) => {
    const {
      print,
      parameters: { first = '.' },
      configureProject,
    } = toolbox

    const path = first

    try {
      await configureProject(`${path}/`)
      print.success('Project configured')
    } catch (error) {
      print.error(error)
      process.exit(1)
    }
  },
}

module.exports = command
