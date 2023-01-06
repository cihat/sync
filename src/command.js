import { exec } from "child_process";
import chalk from 'chalk';

import Randoma from 'randoma';
const random = new Randoma({ seed: 10 })

export async function execCommand(command, projectName) {
  const log = console.log;

  await exec(command, (err, stdout, stderr) => {
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