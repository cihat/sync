import fs from "fs";
import inquirer from "inquirer";
import { getProjects, getProjectsObject } from "./utils.js";
import chalk from "chalk";

export default async function question() {
  let projects = []
  let selectedCommand = []
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
      if (!value || !fs.lstatSync(value).isDirectory()) {
        return 'You have entered an invalid path. Please try again.'
      }
      return true
    },
  }]).then(({ path }) => path)

  await inquirer.prompt([{
    type: 'confirm',
    name: 'isSurePath',
    message: `Your path is: "${projectsPath}", are you sure?`,
    default: true
  }]).then(({ isSurePath }) => isSurePath).then(isSurePath => {
    if (!isSurePath) {
      log(chalk.bgRed.redBright.bold('EXIT PROGRAM'))
      return
    }

    process.env.ROOT_PATH = projectsPath
    return true
  })

  projects = await getProjects(process.env.ROOT_PATH)

  projects = await inquirer.prompt([{
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
    checked: true
  }]).then((answers) => getProjectsObject(answers.projects, projectsPath))

  if (projects.length === 0) {
    log(chalk.bgRed.redBright.bold('EXIT PROGRAM'))
    return
  }

  selectedCommand = await inquirer.prompt([{
    type: 'checkbox',
    name: 'commands',
    message: 'Select the commands you want to run',
    choices: [
      {
        name: 'pull: git pull upstream master',
        value: 'pull',
        checked: true
      },
      {
        name: 'push: git push origin master',
        value: 'push',
        checked: true
      },
      {
        name: 'sync: ./sync',
        value: 'sync',
        checked: true
      }
    ]
  }]).then((answers) => answers.commands)

  log(chalk.bgGreen.bgWhite.white.italic(`Syncing these projects -- > ${JSON.stringify(projects, null, 2)} projects\n`))

  return {
    projects,
    selectedCommand
  }
}