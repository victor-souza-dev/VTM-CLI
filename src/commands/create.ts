import { GluegunCommand } from 'gluegun'
import renamePackageName from '../utils/renamePackageName'

const command: GluegunCommand = {
  name: 'create',
  run: async (toolbox) => {
    const { print, parameters, system, filesystem } = toolbox

    const projectName = parameters.first

    if (!projectName) {
      print.error('Please provide a project name.')
      return
    }

    print.info(`Creating a new Vite project with name: ${projectName}`)

    // Clone the repository
    system.exec(
      `git clone -b basic https://github.com/TechMinds-Group/TechMinds-NodeCli.git ${projectName}`
    )

    // Navigate to the project directory
    system.exec(`cd ${projectName}`)

    // Rename package name
    renamePackageName({ filesystem, projectName })

    // Run npm install
    system.exec('npm install')

    print.success('Project created successfully!')
  },
}

module.exports = command
