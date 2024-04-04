import { execSync } from "child_process";

import { COMMANDS } from './constants.js'
import { checkExistFile } from './utils/io.js'
import { log } from './utils/log.js'

function execCommand(command, projectName) {
  log(`Running command: ${command} - ${projectName}`)

  try {
    const stdout = execSync(command)
    log(`${command}\t\n${stdout}`, 'success')
  } catch (error) {
    log(`${projectName}: ${error?.message}\t\n`, 'error')
  }
}

export const commandList = {
  pull: (projectPath, projectName, shortRepoName, branchName) => {
    const pullCommand = `cd ${projectPath} && git checkout ${branchName} && git pull --rebase ${shortRepoName} ${branchName}`
    execCommand(pullCommand, projectName)
  },
  push: (projectPath, projectName, branchName) => {
    const pushCommand = `cd ${projectPath} && git push origin ${branchName}`
    execCommand(pushCommand, projectName)
  },
  sync: (projectPath, projectName, syncFileName) => {
    const syncCommand = `cd ${projectPath} && ./${syncFileName}`
    execCommand(syncCommand, projectName)
  }
}

export const handleCommand = (project) => {
  const { command = COMMANDS.DEFAULT, path, name, shortRepoName, branchName, syncFileName } = project

  if (!checkExistFile(command.type, path, syncFileName))
    return log(`The file [${command.type}] does not exist in the project ${name} \n\n\n`)

  switch (command.name) {
    case COMMANDS.GIT.PULL:
      commandList.pull(path, name, shortRepoName, branchName)
      break;
    case COMMANDS.GIT.PUSH:
      commandList.push(path, name, branchName)
      break;
    case COMMANDS.SYNC.SYNC:
      commandList.sync(path, name, syncFileName)
      break;
  }
}
