import { Toolbox } from 'gluegun/build/types/domain/toolbox'
import { ISelectOption } from '../controls/customOptions'

module.exports = (toolbox: Toolbox) => {
  const { prompt, system } = toolbox

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
      throw new Error('Invalid project type selected')
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

  async function selectOption({
    name,
    choices,
    message,
    errorMessage,
  }: ISelectOption): Promise<string> {
    const select = await prompt.ask({
      type: 'select',
      choices: [...choices],
      name,
      message,
    })

    if (!select || !choices.includes(select[name])) {
      throw new Error(errorMessage)
    }

    return select[name]
  }

  toolbox.selectOption = selectOption
  toolbox.typeProject = typeProject
  toolbox.openVsCode = openVsCode
}
