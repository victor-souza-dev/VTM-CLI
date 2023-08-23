import * as fs from 'fs'
import { GluegunFilesystem } from 'gluegun'

interface PackageJson {
  filesystem: GluegunFilesystem
  projectName: string
}

export default function renamePackageName({
  filesystem,
  projectName,
}: PackageJson): void {
  const packageJsonPath = 'package.json'

  // Lê o conteúdo do package.json
  const packageJson = filesystem.read('package.json', 'json')

  // Verifica se packageJson é null (caso não exista)
  if (packageJson) {
    // Define o nome do projeto no package.json
    packageJson.name = projectName

    // Escreve as alterações de volta no package.json
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))
  }
}
