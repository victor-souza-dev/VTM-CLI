import * as fs from 'fs'
import { Toolbox } from 'gluegun/build/types/domain/toolbox'
import * as shell from 'shelljs'

interface IInstallDependencies {
  projectName: string
}

module.exports = (toolbox: Toolbox) => {
  const {
    parameters,
    print: { info },
  } = toolbox

  async function installDependencies({ projectName }: IInstallDependencies) {
    const i = parameters.options.i || parameters.options.install

    if (!i) {
      return
    }

    const packageJsonPath = `${projectName}/package.json`
    if (!fs.existsSync(packageJsonPath)) {
      throw new Error(`No package.json found in ${projectName}`)
    }

    info('Installing dependencies...')

    await shell.cd(projectName).exec(`npm install`)
  }

  toolbox.installDependencies = installDependencies
}
