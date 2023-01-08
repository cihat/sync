import { rootPath, projectNames, allProjectsDirName } from './constants.js'

import fs from "fs"
import path from "path"
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
    projectsPath = path.join(osRootPath, allProjectsDirName)
  }

  projectsPath = path

  console.log('projectsPath', projectsPath)


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