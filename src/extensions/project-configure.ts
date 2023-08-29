import * as fs from 'fs'
import * as yaml from 'js-yaml'
import { Toolbox } from 'gluegun/build/types/domain/toolbox'
import { extractInstallDependencies } from '../utils/extractInstallDependencies'
import { IConfigProject } from '../controls/defaultConfig'
import { validateFieldsConfig } from '../utils/validateFieldsConfig'

module.exports = (toolbox: Toolbox) => {
  async function configure(path = './'): Promise<void> {
    const configContents = fs.readFileSync(`${path}config.yml`, 'utf-8')
    const config = yaml.load(configContents) as IConfigProject

    validateFieldsConfig(config)

    console.log(extractInstallDependencies(config))
  }

  toolbox.configureProject = configure
}
