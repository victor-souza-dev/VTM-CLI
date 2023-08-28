import { Toolbox } from 'gluegun/build/types/domain/toolbox'
import { IConfigProject } from '../controls/defaultConfig'
import renamePackage from '../utils/renamePackage'
import * as yaml from 'js-yaml'
import * as AdmZip from 'adm-zip'
import * as path from 'path'

module.exports = (toolbox: Toolbox) => {
  const { filesystem } = toolbox

  async function create(config: IConfigProject): Promise<void> {
    const { name, ...rest } = config

    const zip = new AdmZip(path.join(__dirname, '../templates/basic.zip'))
    zip.extractAllTo(`./${name}`, true)

    filesystem.write(`./${name}/config.yml`, yaml.dump(rest))

    await renamePackage(name)
  }

  toolbox.createProject = create
}
