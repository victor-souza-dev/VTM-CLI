import { Toolbox } from 'gluegun/build/types/domain/toolbox'
import * as yaml from 'js-yaml'
import * as fs from 'fs'

module.exports = (toolbox: Toolbox) => {
  async function configure(path = './'): Promise<void> {
    try {
      const configContents = fs.readFileSync(`${path}config.yml`, 'utf-8')
      const config = yaml.load(configContents)
      console.log('Configurações lidas:', config)
    } catch (err) {
      throw new Error('Erro ao ler o arquivo de configuração')
    }
  }

  toolbox.configureProject = configure
}
