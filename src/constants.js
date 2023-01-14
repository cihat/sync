import { getAnswers } from "./utils.js"

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
    loop: true,
    default: 'username',
  },
  PROJECTS_PATH: {
    type: 'suggest',
    name: 'path',
    message: 'Can you enter the path of your projects? ',
    loop: true,
  },
  IS_SURE_PATH: {
    type: 'confirm',
    name: 'isSurePath',
    default: true,
    loop: true,
  },
  BRANCH_NAME: {
    type: 'input',
    name: 'branchName',
    message: 'Can you enter the branch name you want to sync? ',
    loop: true,
    default: 'master',
  },
  SELECTED_PROJECTS: {
    type: 'checkbox',
    name: 'projects',
    message: 'Select the projects you want to sync',
    checked: true,
  },
  SELECTED_COMMANDS: {
    type: 'checkbox',
    name: 'commands',
    message: 'Select the commands you want to run',
  },
  SYNC_FILE_NAME: {
    type: 'input',
    name: 'syncFileName',
    message: 'Can you enter the sync file name you want to sync? ',
    loop: true,
    default: "sync",
  },
}

export {
  COMMANDS,
  FILE_TYPES,
  questionsText,
}