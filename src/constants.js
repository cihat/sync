import { getAnswers } from "./utils/io.js"

const COMMANDS = {
  GIT: {
    TYPE: 'git',
    PULL: 'pull',
    PUSH: 'push',
  },
  SYNC: {
    TYPE: 'sync',
    SYNC: 'sync',
  },
  DEFAULT: 'default',
}

const FILE_TYPES = {
  GIT: COMMANDS.GIT.TYPE,
  SYNC: COMMANDS.SYNC.TYPE,
}

const questionsText = {
  USE_PREVIOUS_ANSWERS: {
    type: 'confirm',
    name: 'usePreviousAnswers',
    message: `${JSON.stringify(getAnswers(), null, 2)}\nDo you want to use the previous settings?`,
    default: true,
  },
  USER_NAME: {
    type: 'input',
    name: 'username',
    message: 'Can you enter your computer username? ',
    default: 'username',
  },
  PROJECTS_PATH: {
    type: 'suggest',
    name: 'path',
    message: 'Can you enter the path of your projects? ',
  },
  IS_SURE_PATH: {
    type: 'confirm',
    name: 'isSurePath',
    default: true,
  },
  SHORT_REPO_NAME: {
    type: 'input',
    name: 'shortRepoName',
    message: 'Can you enter the shorthand repository name you want to pull [example: origin, upstream]? ',
    default: 'upstream',

  },
  BRANCH_NAME: {
    type: 'input',
    name: 'branchName',
    message: 'Can you enter the branch name you want to sync? ',
    default: 'master',
  },
  SELECTED_PROJECTS: {
    type: 'checkbox',
    name: 'projects',
    message: 'Select the projects you want to sync',
    checked: true,
    loop: true,
  },
  SELECTED_COMMANDS: {
    type: 'checkbox',
    name: 'commands',
    message: 'Select the commands you want to run',
    checked: true,
    loop: true,
  },
  SYNC_FILE_NAME: {
    type: 'input',
    name: 'syncFileName',
    message: 'Can you enter the sync file name you want to sync? ',
    default: "sync",
  },
}

const coolTerminalText = `


      /$$$$$$$ /$$   /$$ /$$$$$$$   /$$$$$$$
     /$$_____/| $$  | $$| $$__  $$ /$$_____/
    |  $$$$$$ | $$  | $$| $$  \ $$| $$
     \____  $$| $$  | $$| $$  | $$| $$
     /$$$$$$$/|  $$$$$$$| $$  | $$|  $$$$$$$
    |_______/  \____  $$|__/  |__/ \_______/
               /$$  | $$
              |  $$$$$$/
               \______/
`

const tips = `
\n\n
    TIPS:
      - You can use the arrow keys to navigate.
      - You can use the space bar to select.
      - You can use the enter key to confirm.
      - You can use the escape key to cancel.

      EXAMPLE: Question bla bla bla (default value)
      Bracketed values are the default value if the user simply hits enter.
      If you want to change the default value, simply type your value.
      If you want to keep the default value, simply hit enter.

      EXAMPLE: Question bla bla bla (Y/n)
      Capitalized values are the default value if the user simply hits enter.
      If you want to change the default value, simply type your value.

      List of questions to ask the user

      - ${questionsText.USER_NAME.message} (username)
      - ${questionsText.PROJECTS_PATH.message} (/Users/username/Projects)
      - Your path is: "projectPath" are you sure? (true)
      - ${questionsText.SHORT_REPO_NAME.message} (upstream)
      - ${questionsText.BRANCH_NAME.message} (master)
      - ${questionsText.SELECTED_PROJECTS.message} [project1, project2, project3, ...]
      - ${questionsText.SELECTED_COMMANDS.message} [pull, push, sync]
      - ${questionsText.SYNC_FILE_NAME.message} (sync)
      \n\n
`

export {
  COMMANDS,
  FILE_TYPES,
  questionsText,
  coolTerminalText,
  tips
}
