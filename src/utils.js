import fs from "fs"
import os from "os"

function getProjectsObject(projectNames, projectsPath) {
  return projectNames.map(name => ({
    name,
    path: `${projectsPath}/${name}/`
  }))
}

async function getProjects(path) {
  let osRootPath
  let projectsPath

  if (!path) {
    osRootPath = os.homedir()
    path = path.join(osRootPath, "www")
  }
  projectsPath = path

  const directories = await fs.promises.readdir(projectsPath).then(files => {
    return files.filter(file => {
      return fs.statSync(`${projectsPath}/${file}`).isDirectory()
    })
  })

  return getProjectsObject(directories)
}

export {
  getProjects,
  getProjectsObject
}