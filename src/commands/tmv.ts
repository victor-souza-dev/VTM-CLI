import { GluegunCommand } from 'gluegun'

const command: GluegunCommand = {
  name: 'tmv',
  run: async (toolbox) => {
    const { print } = toolbox

    print.info('Welcome to your CLI')
  },
  description: 'Welcome to system message',
}

module.exports = command
