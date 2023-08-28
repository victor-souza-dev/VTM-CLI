import { ISelectOption, customOptions } from '../controls/customOptions'
import { IConfigProject } from '../controls/defaultConfig'

function getNewStep(step: string): string | undefined {
  const currentPosition = Object.keys(customOptions)
  return currentPosition[currentPosition.indexOf(step) + 1]
}
async function getNextOptions(
  previousOptions: Partial<IConfigProject>,
  step: string
): Promise<ISelectOption | undefined> {
  if (step === 'cssStyled') {
    if (previousOptions.cssFramework === 'Material UI') {
      const filteredChoices = customOptions[step].choices.filter(
        (choice) => choice !== 'Sass' && choice !== 'None'
      )

      return {
        ...customOptions[step],
        choices: filteredChoices,
      }
    } else if (previousOptions.cssFramework === 'Chakra-UI') {
      return undefined
    }
  }

  return customOptions[step]
}

export async function processStep(
  currentStep: string,
  customConfig: Partial<IConfigProject>,
  selectOption: (object: ISelectOption) => Promise<string>
): Promise<IConfigProject> {
  if (!currentStep) {
    return customConfig as IConfigProject
  }

  const stepOption = await getNextOptions(customConfig, currentStep)
  if (!stepOption) {
    return customConfig as IConfigProject
  }

  const option = await selectOption(stepOption)
  customConfig = {
    ...customConfig,
    [currentStep]: option,
  }

  return processStep(getNewStep(currentStep), customConfig, selectOption)
}
