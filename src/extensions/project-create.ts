import { Toolbox } from 'gluegun/build/types/domain/toolbox'
import renamePackage from '../utils/renamePackage'
import { IConfigProject } from '../control-objects/defaultConfig'

module.exports = (toolbox: Toolbox) => {
  const { system } = toolbox

  async function create(config: IConfigProject): Promise<void> {
    const { name, ...rest } = config

    await system.exec(
      `git clone -b basic https://github.com/TechMinds-Group/TechMinds-NodeCli.git ${name}`
    )

    console.log(rest)

    await renamePackage(name)
  }

  toolbox.createProject = create
}
