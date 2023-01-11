import fs from "fs";
import process from "process";

import chalk from "chalk";
import { getProjects, getProjectsObject } from "./utils.js";

import inquirer from "inquirer";

export default async function question() {
  let projects = []
  let selectedCommand = []
  let branchName = ""
  let selectedProjects = []
  let syncFileName = "sync"
  const log = console.log

  const username = await inquirer.prompt([{
    type: 'input',
    name: 'username',
    message: 'Can you enter your computer username? ',
    loop: true,
    default: "username",
  }]).then(({ username }) => username)

  const projectsPath = await inquirer.prompt([{
    type: 'input',
    name: 'path',
    message: 'Can you enter the path where the projects are located? ',
    loop: true,
    default: `/Users/${username}/www`,
    validate: function (value) {
      if (!value || !fs.lstatSync(value).isDirectory() || !fs.existsSync(value)) {
        return 'You have entered an invalid path. Please try again.'
      }
      return true
    }
  }]).then(({ path }) => path)

  await inquirer.prompt([{
    type: 'confirm',
    name: 'isSurePath',
    message: `Your path is: "${projectsPath}", are you sure?`,
    default: true
  }]).then(({ isSurePath }) => isSurePath).then(isSurePath => {
    if (!isSurePath) {
      log(chalk.bgGreen.greenBright.bold('Please run the program again and enter the correct path'))
      log(chalk.bgRed.redBright.bold('Bye Bye! 👋🏼👋🏼👋🏼'))

      process.exit()
    }

    return true
  })

  branchName = await inquirer.prompt([{
    type: 'input',
    name: 'branchName',
    message: 'Can you enter the branch name you want to sync? ',
    loop: true,
    default: "master",
  }]).then(({ branchName }) => branchName)

  projects = await getProjects(projectsPath)

  if (projects.length === 0) {
    log(chalk.bgRed.redBright.bold('There are no projects in the path you entered'))
    log(chalk.bgRed.redBright.bold('Bye Bye! '), "👋🏼 👋🏼 👋🏼")

    process.exit()
  }

  selectedProjects = await inquirer.prompt([{
    type: 'checkbox',
    name: 'projects',
    message: 'Select the projects you want to sync',
    choices: projects.map(project => {
      return {
        name: project.name,
        value: project.name,
        checked: true
      }
    }),
    checked: true,
  }]).then((answers) => getProjectsObject(answers.projects, projectsPath))

  selectedCommand = await inquirer.prompt([{
    type: 'checkbox',
    name: 'commands',
    message: 'Select the commands you want to run',
    choices: [
      {
        name: `pull: git pull upstream ${branchName}`,
        value: 'pull',
        checked: true
      },
      {
        name: `push: git push origin ${branchName}`,
        value: 'push',
        checked: true
      },
      {
        name: `sync`,
        value: 'sync',
        checked: true
      }
    ]
  }]).then(({ commands }) => commands)

  if (selectedCommand.includes('sync')) {
    syncFileName = await inquirer.prompt([{
      type: 'input',
      name: 'syncFileName',
      message: 'Can you enter the sync file name you want to sync? ',
      loop: true,
      default: "sync",
    }]).then(({ syncFileName }) => syncFileName)
  }

  log(chalk.bgGreen.bgWhite.white.italic(`Syncing these projects -- > ${JSON.stringify(projects, null, 2)} projects\n`))

  return {
    selectedProjects,
    selectedCommand,
    branchName,
    syncFileName
  }
}