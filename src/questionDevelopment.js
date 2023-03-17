import fs from "fs";
import process from "process";

import chalk from "chalk";
import { getProjects, getProjectsObject } from "./utils.js";
import { COMMANDS, questionsText } from './constants.js'

import inquirer from "inquirer";

export default async function question() {
  const log = console.log

  const {
    USER_NAME,
    PROJECTS_PATH,
    IS_SURE_PATH,
    BRANCH_NAME,
    SELECTED_PROJECTS,
    SELECTED_COMMANDS,
    SYNC_FILE_NAME
  } = questionsText

  return await inquirer.prompt([
    {
      type: USER_NAME.type,
      name: USER_NAME.name,
      message: USER_NAME.message,
      loop: USER_NAME.loop,
      default: USER_NAME.default,
    },
    {
      type: PROJECTS_PATH.type,
      name: PROJECTS_PATH.name,
      message: PROJECTS_PATH.message,
      loop: PROJECTS_PATH.loop,
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
      loop: IS_SURE_PATH.loop,
      message: ({ path }) => `Your path is: "${path}", are you sure?`,
    },
    {
      type: BRANCH_NAME.type,
      name: BRANCH_NAME.name,
      message: BRANCH_NAME.message,
      loop: BRANCH_NAME.loop,
      default: BRANCH_NAME.default,
    },
    {
      type: SELECTED_PROJECTS.type,
      name: SELECTED_PROJECTS.name,
      message: SELECTED_PROJECTS.message,
      checked: SELECTED_PROJECTS.checked,
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
      loop: SYNC_FILE_NAME.loop,
      default: SYNC_FILE_NAME.default,
      when: ({ commands }) => commands.some(command => command.type == COMMANDS.SYNC.TYPE)
    }
  ]).then(({ projects, commands, branchName, syncFileName, path }) => {
    const _projects = getProjectsObject(projects, path)

    return {
      projects: _projects,
      commands,
      branchName,
      syncFileName
    }
  })
}