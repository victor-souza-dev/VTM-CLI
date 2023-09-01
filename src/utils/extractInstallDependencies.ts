import { IConfigAdapter } from '../adapters/configAdapter'
import { dependencyInstall } from '../controls/dependencyInstall'

function tratamentValues(value: string): string {
  return value.toLowerCase().replace(/\s/g, '')
}

export function extractInstallDependencies(config: IConfigAdapter) {
  let dependencies: string = 'npm i '

  switch (tratamentValues(config.styled.cssFramework)) {
    case `materialui`:
      dependencies +=
        // @ts-ignore
        dependencyInstall.materialui[tratamentValues(config.styled.cssStyled)] +
        ``
      break

    default:
      Object.keys(config.styled).forEach((value) => {
        dependencies +=
          // @ts-ignore
          dependencyInstall[tratamentValues(config.styled[value])] + ' '
      })
      break
  }

  return dependencies.trim()
}
