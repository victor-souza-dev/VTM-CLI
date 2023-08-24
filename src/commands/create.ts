import { GluegunCommand } from 'gluegun'

const command: GluegunCommand = {
  name: 'create',
  description: 'Create a new Vite project boilerplate',
  run: async (toolbox) => {
    const {
      print,
      parameters,
      createBasicProject,
      installDependencies,
      typeProject,
      openVsCode,
    } = toolbox

    const projectName = parameters.first

    if (!projectName) {
      print.error('Please provide a project name.')
      return
    }

    print.info(`Creating a new Vite project with name: ${projectName}`)

    try {
      const projectTypeString = await typeProject()

      switch (projectTypeString) {
        case 'Basic':
          await createBasicProject({ projectName })
          break
        case 'Custom':
          print.error('Not implemented yet.')
          return
        default:
          await createBasicProject({ projectName })
          break
      }

      await installDependencies({ projectName })
      await openVsCode()
      print.success('Project created successfully!')
    } catch (err) {
      print.error(err)
      process.exit(1)
    }
  },
}

module.exports = command
