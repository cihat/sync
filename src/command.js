import { exec, execSync } from "child_process";
import chalk from 'chalk';

import Randoma from 'randoma';
const random = new Randoma({ seed: 10 })

async function execCommand(command, projectName) {
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
  pull: async (projectPath, projectName) => {
    const pullCommand = `cd ${projectPath} && git pull upstream master`
    // const testCommand = "echo 'pull: 1'"
    await execCommand(pullCommand, projectName)
  },
  push: async (projectPath, projectName) => {
    const pushCommand = `cd ${projectPath} && git push origin master`
    // const testCommand = "echo 'push: 2'"
    await execCommand(pushCommand, projectName)
  },
  sync: async (projectPath, projectName) => {
    const syncCommand = `cd ${projectPath} && ./sync`
    // const testCommand = "echo 'sync: 3'"
    await execCommand(syncCommand, projectName)
  }
}