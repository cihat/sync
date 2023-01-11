import fs from "fs"

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

  return getProjectsObject(directories)
}

export {
  getProjects,
  getProjectsObject
}