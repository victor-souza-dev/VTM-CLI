import { Toolbox } from 'gluegun/build/types/domain/toolbox'
import renamePackage from '../utils/renamePackage'

interface ICreate {
  projectName: string
}

module.exports = (toolbox: Toolbox) => {
  const { system } = toolbox

  async function create({ projectName }: ICreate): Promise<void> {
    await system.exec(
      `git clone -b basic https://github.com/TechMinds-Group/TechMinds-NodeCli.git ${projectName}`
    )

    await renamePackage({ projectName })
  }

  toolbox.createBasicProject = create
}
