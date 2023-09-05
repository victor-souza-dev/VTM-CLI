import * as fs from 'fs'
import { Toolbox } from 'gluegun/build/types/domain/toolbox'
import * as yaml from 'js-yaml'
import { IConfigAdapter } from '../adapters/configAdapter'
import { getTemplatePath } from '../utils/getTemplatePath'
import { tratamentConfigs } from '../utils/tratamentConfigs'
import { validateFieldsConfig } from '../utils/validateFieldsConfig'

module.exports = (toolbox: Toolbox) => {
  //const { template } = toolbox
  async function configure(path = './'): Promise<void> {
    const configContents = fs.readFileSync(`${path}config.yml`, 'utf-8')
    let config = yaml.load(configContents) as IConfigAdapter

    Object.keys(config).forEach((value) => {
      // @ts-ignore
      validateFieldsConfig(config[value])
    })

    config = tratamentConfigs(config)

    //const dependencies = extractInstallDependencies(config)
    console.log(
      getTemplatePath(config.styled, 'home', `${path}src/pages/home/`)
    )

    //await template.generate({
    //template: '',
    //target: '',
    //props: {}
    //})
  }

  toolbox.configureProject = configure
}
