#!/usr/bin/env node

import { commandList } from "./src/command.js";
import chalk from "chalk";
import questions from "./src/question.js";

(async () => {
  const log = console.log
  const { selectedProjects, selectedCommand, branchName, syncFileName } = await questions()

  log(chalk.bgGreen.bgWhite.white.italic(`Syncing these projects -- > ${JSON.stringify(selectedProjects, null, 2)} projects\n`))

  selectedProjects.forEach(async project => {
    const { name, path } = project

    log(chalk.bgCyan.cyanBright.italic("Project Name --> ", name))

    selectedCommand.forEach(async command => {
      log(chalk.bgYellow.yellowBright.italic("Command --> ", command))
      await commandList[command](path, name, branchName, syncFileName)
    })
  })
})()