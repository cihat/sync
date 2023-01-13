#!/usr/bin/env node

import { commandList, handleCommands } from "./src/command.js";
import chalk from "chalk";
import questionsProduction from "./src/question.js";
import questionDevelopment from "./src/questionDevelopment.js";

const questions = process.env.NODE_ENV === 'development' ? questionDevelopment : questionsProduction

console.log('NODE_ENV', process.env.NODE_ENV);

(async () => {
  const log = console.log
  const { selectedProjects, selectedCommand, branchName, syncFileName } = await questions()

  log(chalk.bgGreen.bgWhite.white.italic(`Syncing these projects -- > ${JSON.stringify(selectedProjects, null, 2)} projects\n`))

  selectedProjects.forEach(async project => {
    const { name, path } = project

    log(chalk.bgCyan.cyanBright.italic("Project Name --> ", name))

    selectedCommand.forEach(async command => {
      log(chalk.bgYellow.yellowBright.italic("Command --> ", command.name))
      await handleCommands(command, path, name, branchName, syncFileName)
    })
  })
})()