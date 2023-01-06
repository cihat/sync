import { projectNames } from "./src/constants.js"
import { getProjects } from "./src/utils.js"
import { execCommand } from "./src/command.js";
import chalk from "chalk";
//coming soon
// import co from "co";

function sync() {
  const projects = getProjects(projectNames)

  console.log(chalk.yellow.white.bold(`Syncing -->  ${JSON.stringify(projects, null, 2)} projects\n`))

  projects.forEach(async (project) => {
    const { name: projectName, path: projectPath } = project

    const pullCommand = `cd ${projectPath} && git pull upstream master`
    const pushCommand = `cd ${projectPath} && git push origin master`
    const syncCommand = `cd ${projectPath} && ./sync`

    await execCommand(pullCommand, projectName)
    await execCommand(pushCommand, projectName)
    await execCommand(syncCommand, projectName)
  });
}

sync()
