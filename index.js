#!/usr/bin/env node

import { commandList } from "./src/command.js";
import chalk from "chalk";
import questions from "./src/question.js";

import * as dotenv from 'dotenv'
dotenv.config();

(async () => {
  const log = console.log
  const projects = await questions()

  projects.forEach(async project => {
    const { name, path } = project

    log(chalk.bgCyan.cyanBright.italic("Project Name --> ", name, " \t\n"))

    await commandList["pull"](path, name)
    await commandList["push"](path, name)
    await commandList["sync"](path, name)
  })
})()