import { GluegunCommand } from 'gluegun'
import { configCustom } from '../utils/configCustom'
import { IConfigProject, defaultConfig } from '../control-objects/defaultConfig'

const command: GluegunCommand = {
  name: 'create',
  description: 'Create a new Vite project boilerplate',
  run: async (toolbox) => {
    const {
      print,
      parameters,
      createProject,
      installDependencies,
      typeProject,
      openVsCode,
      selectOption,
    } = toolbox

    const projectName = parameters.first

    if (!projectName) {
      print.error('Please provide a project name.')
      return
    }

    let config: IConfigProject = { name: projectName, ...defaultConfig }

    print.info(`Creating a new Vite project with name: ${projectName}`)

    try {
      const projectTypeString = await typeProject()

      if (projectTypeString === 'Custom') {
        config = await configCustom({ projectName, selectOption })
      }

      await createProject(config)
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
