#!/usr/bin/env node

import chalk from "chalk";

import { handleCommands } from "./src/command.js"
import questionsProduction from "./src/question.js"
import questionDevelopment from "./src/questionDevelopment.js"
const questions = process.env.NODE_ENV === 'development' ? questionDevelopment : questionsProduction;

(async () => {
  const log = console.log

  const { projects, commands, shortRepoName, branchName, syncFileName } = await questions()
  log(chalk.bgGreen.bgWhite.white.italic(`Syncing these projects -- > ${JSON.stringify(projects, null, 2)} projects\n`))

  projects.forEach(async project => {
    const { name, path } = project

    log(chalk.bgCyan.cyanBright.italic("Project Name --> ", name))

    commands.forEach(async command => {
      log(chalk.bgYellow.yellowBright.italic("Command --> ", command.name))
      await handleCommands(command, path, name, shortRepoName, branchName, syncFileName)
    })
  })
})()