import { IConfigAdapter } from '../adapters/configAdapter'
import { dependencyInstall } from '../controls/dependencyInstall'

export function extractInstallDependencies(config: IConfigAdapter) {
  let dependencies: string = 'npm i '

  switch (config.styled.cssFramework) {
    case `materialui`:
      if (
        // @ts-ignore
        !dependencyInstall.materialui[config.styled.cssStyled]
      ) {
        throw new Error(
          `To use Material Ui, you need to specify a valid cssStyled`
        )
      }
      dependencies += `${
        // @ts-ignore
        dependencyInstall.materialui[config.styled.cssStyled]
      } `
      break

    default:
      Object.keys(config.styled).forEach((value) => {
        if (
          // @ts-ignore
          !dependencyInstall[config.styled[value]] &&
          config.styled[value] !== 'none'
        ) {
          throw new Error(
            `The ${value} contains an invalid value, see valid options in the documentation: https://github.com/TechMinds-Group/VTM-CLI`
          )
        }

        if (config.styled[value] !== 'none') {
          dependencies +=
            // @ts-ignore
            `${dependencyInstall[config.styled[value]]} `
        }
      })
      break
  }

  if (dependencies === 'npm i ') {
    return ''
  }

  return dependencies.trim()
}
