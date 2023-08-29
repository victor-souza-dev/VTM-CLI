import { IConfigProject, defaultConfig } from '../controls/defaultConfig'

export function validateFieldsConfig(config: IConfigProject): void {
  const fields: string[] = Object.keys(config)
  const fieldsRequired: string[] = Object.keys(defaultConfig)

  fields.forEach((value: string) => {
    if (value === '' || !fieldsRequired.includes(value)) {
      throw new Error(`${value} é um campo inválido`)
    }
  })
}
