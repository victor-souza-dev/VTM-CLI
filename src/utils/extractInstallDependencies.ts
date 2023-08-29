import { IConfigProject } from '../controls/defaultConfig'
import { dependencyInstall } from '../controls/dependencyInstall'

function tratamentValues(value: string): string {
  return value.toLowerCase().replace(/\s/g, '')
}

export function extractInstallDependencies(config: IConfigProject) {
  let dependencies: string = 'npm i '
  let valuesConfig: string[] = Object.values(config)

  valuesConfig.forEach((value: string) => {
    if (
      tratamentValues(config.cssFramework) === 'materialui' &&
      tratamentValues(value) === 'materialui'
    ) {
      console.log(tratamentValues(value))
      dependencies +=
        // @ts-ignore
        dependencyInstall.materialui[tratamentValues(config.cssStyled)] + ' '
    } else {
      dependencies += dependencyInstall[tratamentValues(value)] + ' '
    }
  })

  return dependencies.trim()
}
