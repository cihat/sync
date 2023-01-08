import { projectNames } from "./src/constants.js"
import { getProjects } from "./src/utils.js"
import { commandList } from "./src/command.js";
import chalk from "chalk";

(() => {
  const projects = getProjects(projectNames)

  console.log(chalk.yellow.white.bold(`Syncing -->  ${JSON.stringify(projects, null, 2)} projects\n`))

  projects.forEach(async project => {
    const { name, path } = project

    console.log(chalk.bgCyan.cyanBright.italic("Project Name --> ", name, " \t\n"))

    await commandList["pull"](path, name)
    await commandList["push"](path, name)
    await commandList["sync"](path, name)
  })
})()