import { projectNames } from "./src/constants.js"
import { getProjects } from "./src/utils.js"
import { commandList } from "./src/command.js";
import chalk from "chalk";
import async from "async";
//coming soon
// import co from "co";

async function sync() {
  const projects = getProjects(projectNames)

  console.log(chalk.yellow.white.bold(`Syncing -->  ${JSON.stringify(projects, null, 2)} projects\n`))

  projects.forEach(project => {
    const { name: projectName, path: projectPath } = project

    commandList.pull(projectPath, projectName)
    commandList.push(projectPath, projectName)
    commandList.sync(projectPath, projectName)
  })
}

sync()
