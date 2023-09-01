import * as fs from 'fs'
import * as yaml from 'js-yaml'
import { Toolbox } from 'gluegun/build/types/domain/toolbox'
import { IConfigAdapter } from '../adapters/configAdapter'
import { validateFieldsConfig } from '../utils/validateFieldsConfig'
import { extractInstallDependencies } from '../utils/extractInstallDependencies'

module.exports = (toolbox: Toolbox) => {
  async function configure(path = './'): Promise<void> {
    const configContents = fs.readFileSync(`${path}config.yml`, 'utf-8')
    const config = yaml.load(configContents) as IConfigAdapter

    Object.keys(config).forEach((value) => {
      // @ts-ignore
      validateFieldsConfig(config[value])
    })

    const dependencies = extractInstallDependencies(config)
    console.log(dependencies)
  }

  toolbox.configureProject = configure
}
