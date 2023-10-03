import * as fs from 'fs'
import { Toolbox } from 'gluegun/build/types/domain/toolbox'
import * as shell from 'shelljs'
import { IConfigAdapter } from '../adapters/configAdapter'
import { extractInstallDependencies } from '../utils/extractInstallDependencies'

interface IInstallDependencies {
  projectName: string
  config: IConfigAdapter
}

module.exports = (toolbox: Toolbox) => {
  const {
    parameters,
    print: { info },
  } = toolbox

  async function installDependencies({
    projectName,
    config,
  }: IInstallDependencies) {
    const i = parameters.options.i || parameters.options.install

    if (!i) {
      return
    }

    const packageJsonPath = `${projectName}/package.json`
    if (!fs.existsSync(packageJsonPath)) {
      throw new Error(`No package.json found in ${projectName}`)
    }

    const extractDependencies = extractInstallDependencies(config)

    info('Installing dependencies...')

    await shell.cd(projectName).exec(`npm install`)
    await shell.cd(projectName).exec(extractDependencies)
  }

  toolbox.installDependencies = installDependencies
}
