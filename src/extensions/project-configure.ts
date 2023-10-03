import * as fs from 'fs'
import { Toolbox } from 'gluegun/build/types/domain/toolbox'
import * as yaml from 'js-yaml'
import { IConfigAdapter } from '../adapters/configAdapter'
import { tratamentConfigs } from '../utils/tratamentConfigs'
import { validateFieldsConfig } from '../utils/validateFieldsConfig'
import { formatPasteName } from '../utils/formatPasteName'
import { extensionsOptions } from '../controls/extensionsOptions'
import { formatString } from '../utils/formatString'

interface TemplatesIterator {
  name: string
  path: string
}

const templatesArray: TemplatesIterator[] = [
  {
    name: 'App',
    path: 'styles/App.css',
  },
  {
    name: 'Index',
    path: 'styles/Index.css',
  },
  {
    name: 'Home',
    path: 'pages/Home/Home.tsx',
  },
  {
    name: 'Main',
    path: 'main.tsx',
  },
]

module.exports = (toolbox: Toolbox) => {
  const { template, filesystem } = toolbox
  async function configure(path = './'): Promise<void> {
    const configContents = fs.readFileSync(`${path}config.yml`, 'utf-8')
    let config = yaml.load(configContents) as IConfigAdapter

    Object.keys(config).forEach((value) => {
      // @ts-ignore
      validateFieldsConfig(config[value])
    })

    config = tratamentConfigs(config)

    const pathTemplates: string = formatPasteName(config.styled)

    for (const iterator of templatesArray) {
      const templatePath = `./${pathTemplates}/${iterator.name.toLowerCase()}.ts.ejs`
      const targetPath = `${path}src/${iterator.path}`

      await template.generate({
        template: templatePath,
        target: targetPath,
      })

      let extensionArray: string[] = iterator.path.split('.')
      let extension = extensionArray[extensionArray.length - 1]

      if (extension === 'css') {
        filesystem.renameAsync(
          targetPath,
          `${iterator.name}.${
            extensionsOptions[formatString(config.styled.cssStyled)]
          }`,
          {
            overwrite: true,
          }
        )
      }
    }
  }

  toolbox.configureProject = configure
}
