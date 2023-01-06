import { rootPath } from './constants.js'

function getProjects(projectNames) {
  return projectNames.map(name => ({
    name,
    path: `${rootPath}${name}/`
  }))
}

export {
  getProjects
}