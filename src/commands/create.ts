import { GluegunCommand } from 'gluegun'
import { configCustom } from '../utils/configCustom'
import { IConfigProject, defaultConfig } from '../controls/defaultConfig'
import { configAdapter } from '../adapters/configAdapter'

const command: GluegunCommand = {
  name: 'create',
  description: 'Create a new Vite project boilerplate',
  run: async (toolbox) => {
    const {
      print: { info, success, error },
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
      error('Please provide a project name.')
      return
    }

    let config: IConfigProject = { ...defaultConfig, name: projectName }

    info(`Creating a new Vite project with name: ${projectName}`)

    try {
      const projectTypeString = await typeProject()

      if (projectTypeString === 'Custom') {
        config = await configCustom({ projectName, selectOption })
      }

      await createProject(config)
      projectTypeString === 'Custom' &&
        (await configureProject(`./${config.name}/`))
      await installDependencies({ projectName, config: configAdapter(config) })
      await openVsCode()

      success('Project created successfully!')
    } catch (err) {
      error(err)
      process.exit(1)
    }
  },
}

module.exports = command
