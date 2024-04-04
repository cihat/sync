#!/usr/bin/env node

import { handleCommand, questionDevelopment, questionsProduction } from "./src/index.js"
import { log } from "./src/utils/log.js";

const questions = process.env.NODE_ENV === 'development' ? questionDevelopment : questionsProduction;

(async () => {
  const { projects, commands, shortRepoName, branchName, syncFileName } = await questions()
  log(`Syncing these commands -- > ${JSON.stringify(commands, null, 2)} commands\n`)

  projects.forEach(async project => {
    const { name, path } = project

    commands.forEach(async command => {
      await handleCommand({
        command,
        path,
        name,
        shortRepoName,
        branchName,
        syncFileName
      })
    })
  })
})()
