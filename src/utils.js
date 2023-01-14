import fs from "fs"
import { COMMANDS } from "./constants.js"

function getProjectsObject(projectNames, projectsPath) {
  return projectNames.map(name => ({
    name,
    path: `${projectsPath}/${name}/`
  }))
}

async function getProjects(path) {
  if (!path) return new Error("No path provided.")

  const directories = await fs.promises.readdir(path).then(files => {
    return files.filter(file => {
      return fs.statSync(`${path}/${file}`).isDirectory()
    })
  })

  return getProjectsObject(directories, path)
}

const checkExistGitFile = (path) => fs.existsSync(`${path}/.git`)

const checkExistSyncFile = (path, syncFileName) => {
  try {
    return fs.statSync(`${path}${syncFileName}`).isFile();
  }
  catch (err) {
    return false;
  }
}

function checkExistFile(fileType, path, syncFileName) {
  switch (fileType) {
    case COMMANDS.GIT.TYPE:
      return checkExistGitFile(path)
    case COMMANDS.SYNC.TYPE:
      return checkExistSyncFile(path, syncFileName)
    default:
      return true
  }
}

export {
  getProjects,
  getProjectsObject,
  checkExistFile
}