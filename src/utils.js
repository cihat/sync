import { rootPath, projectNames } from './constants.js'

import fs from "fs"
import path from "path"
import os from "os"

function getProjectsObject(projectNames) {
  return projectNames.map(name => ({
    name,
    path: `${rootPath}${name}/`
  }))
}

async function getProjects(isAllProjects) {
  if (!isAllProjects) return getProjectsObject(projectNames)

  const osRootPath = os.homedir()
  const projectsPath = path.join(osRootPath, 'www')

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