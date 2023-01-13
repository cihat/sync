import { execSync } from "child_process";
import chalk from 'chalk';

import Randoma from 'randoma';
const random = new Randoma({ seed: 10 })

import { COMMANDS } from './constants.js'
import { checkExistFile } from './utils.js'

function execCommand(command, projectName) {
  const log = console.log;

  log(chalk.yellow.bold(`Running command: ${command} - ${projectName}`))

  try {
    const stdout = execSync(command).toString()

    log(chalk.hex(random.color(0.5).hex().toString()).underline.bold(`Success - ${projectName}: ${command}\t\n\t`))
    log(chalk.hex(random.color(0.5).hex().toString()).underline.bold(`Output - ${projectName}: ${stdout}\t\n\t\n\t\n\n`))
  } catch (error) {
    log(chalk.hex(random.color(0.5).hex().toString()).underline.bold(`Error - ${projectName}: ${error}\t\n\t\n\t\n\n`))
    return
  }
}

export const commandList = {
  pull: (projectPath, projectName, branchName) => {
    const pullCommand = `cd ${projectPath} && git pull upstream ${branchName}`
    // const testCommand = "echo 'pull: 1'"
    execCommand(pullCommand, projectName)
  },
  push: (projectPath, projectName, branchName) => {
    const pushCommand = `cd ${projectPath} && git push origin ${branchName}`
    // const testCommand = "echo 'push: 2'"
    execCommand(pushCommand, projectName)
  },
  sync: (projectPath, projectName, branchName, syncFileName) => {
    const syncCommand = `cd ${projectPath} && ./${syncFileName}`
    // const testCommand = "echo 'sync: 3'"
    execCommand(syncCommand, projectName)
  }
}

export const handleCommands = (command = COMMANDS.DEFAULT, projectPath, projectName, branchName, syncFileName) => {
  if (!checkExistFile(command.type, projectPath, syncFileName)) {
    console.log(chalk.bgRed.redBright.bold(`The file [${command.type}] does not exist in the project ${projectName} \n\n\n`))
    return
  }

  switch (command.name) {
    case COMMANDS.GIT.PULL:
      commandList.pull(projectPath, projectName, branchName)
      break;
    case COMMANDS.GIT.PUSH:
      commandList.push(projectPath, projectName, branchName)
      break;
    case COMMANDS.SYNC.SYNC:
      commandList.sync(projectPath, projectName, branchName, syncFileName)
      break;
    default:

  }
}