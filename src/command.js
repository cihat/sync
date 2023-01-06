import { exec } from "child_process";
import chalk from 'chalk';

import Randoma from 'randoma';
const random = new Randoma({ seed: 10 })

function execCommand(command, projectName) {
  const log = console.log;

  exec(command, (err, stdout, stderr) => {
    if (err) {
      log(chalk.hex(random.color(0.5).hex().toString()).underline.bold(`Error - ${projectName}: ${err}\n`))
      return
    }
    if (stderr) {
      log(chalk.hex(random.color(0.5).hex().toString()).underline.bold(`${command}\n - ${projectName}: ${stderr}\n`))
      return
    }
    log(chalk.hex(random.color(0.5).hex().toString()).underline.bold(`Success - ${projectName}: ${stdout}\n`))
  })
}

export const commandList = {
  pull: (projectPath, projectName) => {
    const pullCommand = `cd ${projectPath} && git pull upstream master`
    execCommand(pullCommand, projectName)
  },
  push: (projectPath, projectName) => {
    const pushCommand = `cd ${projectPath} && git push origin master`
    execCommand(pushCommand, projectName)
  },
  sync: (projectPath, projectName) => {
    const syncCommand = `cd ${projectPath} && ./sync`
    execCommand(syncCommand, projectName)
  }
}