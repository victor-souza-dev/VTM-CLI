import { Toolbox } from 'gluegun/build/types/domain/toolbox'

module.exports = (toolbox: Toolbox) => {
  const { prompt, print, system } = toolbox

  async function typeProject(): Promise<string> {
    const projectType = await prompt.ask({
      type: 'select',
      name: 'projectType',
      message: 'Choose project type:',
      choices: ['Basic', 'Custom'],
    })

    if (
      !projectType ||
      !['Basic', 'Custom'].includes(projectType.projectType)
    ) {
      print.error('Invalid project type selected.')
      return
    }

    return await projectType.projectType
  }

  async function openVsCode(): Promise<void> {
    const open = await prompt.confirm(
      'Do you want to open the project with Visual Studio Code?',
      false
    )

    if (!open) {
      return
    }

    await system.exec('code .')
  }

  toolbox.typeProject = typeProject
  toolbox.openVsCode = openVsCode
}
