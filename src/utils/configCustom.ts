import { ISelectOption } from '../controls/customOptions'
import { IConfigProject } from '../controls/defaultConfig'
import { processStep } from './stepManager'

interface ICreate {
  projectName: string
  selectOption: (object: ISelectOption) => Promise<string>
}

export async function configCustom({
  projectName,
  selectOption,
}: ICreate): Promise<IConfigProject> {
  let customConfig: Partial<IConfigProject> = {
    name: projectName,
  }

  const initialStep = 'cssFramework'

  return processStep(initialStep, customConfig, selectOption)
}
