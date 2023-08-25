import * as fs from 'fs'

export default async function renamePackage(
  projectName: string
): Promise<void> {
  const projectPath = process.cwd()
  const packageJsonPath = `${projectPath}\\${projectName}\\package.json`
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'))
  packageJson.name = projectName
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))
}
