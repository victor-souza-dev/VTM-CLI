import { ISelectOption, customOptions } from '../controls/customOptions'
import { IConfigProject, defaultConfig } from '../controls/defaultConfig'

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

  const keys = Object.keys(defaultConfig) as Array<keyof IConfigProject>

  for (const key of keys) {
    if (customOptions[key]) {
      const option = await selectOption(customOptions[key])
      customConfig = {
        ...customConfig,
        [key]: option,
      }
    }
  }

  return customConfig as IConfigProject
}
