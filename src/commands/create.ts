import { GluegunCommand } from 'gluegun'
import { configCustom } from '../utils/configCustom'
import { IConfigProject, defaultConfig } from '../controls/defaultConfig'

const command: GluegunCommand = {
  name: 'create',
  description: 'Create a new Vite project boilerplate',
  run: async (toolbox) => {
    const {
      print,
      parameters: { first },
      createProject,
      configureProject,
      installDependencies,
      typeProject,
      openVsCode,
      selectOption,
    } = toolbox

    const projectName = first

    if (!projectName) {
      print.error('Please provide a project name.')
      return
    }

    let config: IConfigProject = { ...defaultConfig, name: projectName }

    print.info(`Creating a new Vite project with name: ${projectName}`)

    try {
      const projectTypeString = await typeProject()

      if (projectTypeString === 'Custom') {
        config = await configCustom({ projectName, selectOption })
      }

      await createProject(config)
      await configureProject(`./${config.name}/`)
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
