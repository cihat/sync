import fs from "fs";
import process from "process";

import chalk from "chalk";
import { getProjects, getProjectsObject, checkAnswersFileExist, getAnswers, saveAnswers, clearConsoleAndTips } from "./utils.js";
import { COMMANDS, questionsText } from './constants.js'

import inquirer from "inquirer";

async function usePreviousAnswers(USE_PREVIOUS_ANSWERS) {
  return await inquirer.prompt([
    {
      type: USE_PREVIOUS_ANSWERS.type,
      name: USE_PREVIOUS_ANSWERS.name,
      message: USE_PREVIOUS_ANSWERS.message,
      default: USE_PREVIOUS_ANSWERS.default,
      when: ({ usePreviousAnswers }) => {
        if (!checkAnswersFileExist()) return false

        if (usePreviousAnswers) {
          log(chalk.bgGreen.bgWhite.white.italic(`Using the previous answers\n`))

          return false
        }

        return true
      },
    },
  ]).then(({ usePreviousAnswers }) => usePreviousAnswers)
}

export default async function question() {
  const log = console.log

  const {
    USE_PREVIOUS_ANSWERS,
    USER_NAME,
    PROJECTS_PATH,
    IS_SURE_PATH,
    SHORT_REPO_NAME,
    BRANCH_NAME,
    SELECTED_PROJECTS,
    SELECTED_COMMANDS,
    SYNC_FILE_NAME
  } = questionsText

  const isUsePreviousAnswers = await usePreviousAnswers(USE_PREVIOUS_ANSWERS)

  if (isUsePreviousAnswers) {
    const answers = getAnswers()

    return answers
  }
  clearConsoleAndTips()

  return await inquirer.prompt([
    {
      type: USER_NAME.type,
      name: USER_NAME.name,
      message: USER_NAME.message,
      default: USER_NAME.default,
    },
    {
      type: PROJECTS_PATH.type,
      name: PROJECTS_PATH.name,
      message: PROJECTS_PATH.message,
      default: ({ username }) => `/Users/${username}/www`,
      validate: function (value) {
        if (!value || !fs.lstatSync(value).isDirectory() || !fs.existsSync(value)) {
          return 'You have entered an invalid path. Please try again.'
        }
        return true
      }
    },
    {
      type: IS_SURE_PATH.type,
      name: IS_SURE_PATH.name,
      default: IS_SURE_PATH.default,
      message: ({ path }) => `Your path is: "${path}", are you sure?`,
    },
    {
      type: SHORT_REPO_NAME.type,
      name: SHORT_REPO_NAME.name,
      message: SHORT_REPO_NAME.message,
      default: SHORT_REPO_NAME.default,
    },
    {
      type: BRANCH_NAME.type,
      name: BRANCH_NAME.name,
      message: BRANCH_NAME.message,
      default: BRANCH_NAME.default,
    },
    {
      type: SELECTED_PROJECTS.type,
      name: SELECTED_PROJECTS.name,
      message: SELECTED_PROJECTS.message,
      checked: SELECTED_PROJECTS.checked,
      loop: SELECTED_PROJECTS.loop,
      choices: async ({ path }) => {
        const projects = await getProjects(path)

        return projects.map((project) => {
          return {
            name: project.name,
            value: project.name,
            checked: true,
          }
        })
      },
      validate: (projects) => {
        if (projects.length === 0) {
          log(chalk.bgRed.redBright.bold('\nThere are no projects in the path you entered'))
          log(chalk.bgRed.redBright.bold('Bye Bye! '), "👋🏼 👋🏼 👋🏼")

          process.exit()
        }
        return true
      }
    },
    {
      type: SELECTED_COMMANDS.type,
      name: SELECTED_COMMANDS.name,
      message: SELECTED_COMMANDS.message,
      checked: SELECTED_COMMANDS.checked,
      loop: SELECTED_COMMANDS.loop,
      choices: ({ branchName }) => {
        return [
          {
            name: `pull: git pull --rebase upstream ${branchName}`,
            value: {
              name: COMMANDS.GIT.PULL,
              type: COMMANDS.GIT.TYPE,
            },
            type: COMMANDS.GIT.TYPE,
            checked: true
          },
          {
            name: `push: git push origin ${branchName}`,
            value: {
              name: COMMANDS.GIT.PUSH,
              type: COMMANDS.GIT.TYPE,
            },
            type: COMMANDS.GIT.TYPE,
            checked: true
          },
          {
            name: `sync`,
            value: {
              name: COMMANDS.SYNC.SYNC,
              type: COMMANDS.SYNC.TYPE,
            },
            checked: true
          }
        ]
      }
    },
    {
      type: SYNC_FILE_NAME.type,
      name: SYNC_FILE_NAME.name,
      message: SYNC_FILE_NAME.message,
      default: SYNC_FILE_NAME.default,
      when: ({ commands }) => commands.some(command => command.type == COMMANDS.SYNC.TYPE)
    }
  ]).then(({ projects, commands, shortRepoName, branchName, syncFileName, path }) => {
    const _projects = getProjectsObject(projects, path)

    const data = {
      projects: _projects,
      commands,
      shortRepoName,
      branchName,
      syncFileName
    }
    saveAnswers(data)

    return data
  })
}