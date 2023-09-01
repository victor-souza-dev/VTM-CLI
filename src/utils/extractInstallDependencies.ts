import { IConfigAdapter } from '../adapters/configAdapter'
import { dependencyInstall } from '../controls/dependencyInstall'

function tratamentValues(value: string): string {
  if (!value) {
    return ''
  }
  return value.toLowerCase().replace(/\s/g, '')
}

export function extractInstallDependencies(config: IConfigAdapter) {
  let dependencies: string = 'npm i '

  switch (tratamentValues(config.styled.cssFramework)) {
    case `materialui`:
      dependencies += `${
        // @ts-ignore
        dependencyInstall.materialui[tratamentValues(config.styled.cssStyled)]
      } `
      break

    default:
      Object.keys(config.styled).forEach((value) => {
        // @ts-ignore
        if (!dependencyInstall[tratamentValues(config.styled[value])]) {
          throw new Error(
            `The ${value} contains an invalid value, see valid options in the documentation: https://github.com/TechMinds-Group/VTM-CLI`
          )
        }

        if (tratamentValues(config.styled[value]) !== 'none') {
          dependencies +=
            // @ts-ignore
            `${dependencyInstall[tratamentValues(config.styled[value])]} `
        }
      })
      break
  }

  if (dependencies === 'npm i ') {
    return ''
  }

  return dependencies.trim()
}
