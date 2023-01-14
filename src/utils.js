import fs from "fs"
import path from "path"
import { COMMANDS, coolTerminalText, tips } from "./constants.js"

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function getProjectsObject(projectNames, projectsPath) {
  return projectNames.map(name => ({
    name,
    path: `${projectsPath}/${name}/`
  }))
}

async function getProjects(path) {
  if (!path) return new Error("No path provided.")

  const directories = await fs.promises.readdir(path).then(files => {
    return files.filter(file => {
      return fs.statSync(`${path}/${file}`).isDirectory()
    })
  })

  return getProjectsObject(directories, path)
}

const checkExistGitFile = (path) => fs.existsSync(`${path}/.git`)

const checkExistSyncFile = (path, syncFileName) => {
  try {
    return fs.statSync(`${path}${syncFileName}`).isFile();
  }
  catch (err) {
    return false;
  }
}

function checkExistFile(fileType, path, syncFileName) {
  switch (fileType) {
    case COMMANDS.GIT.TYPE:
      return checkExistGitFile(path)
    case COMMANDS.SYNC.TYPE:
      return checkExistSyncFile(path, syncFileName)
    default:
      return true
  }
}

function checkAnswersFileExist() {
  let answersFilePath
  let answers

  try {
    answersFilePath = path.join(path.resolve(__dirname, '../tmp'), "answers.json")
    answers = JSON.parse(fs.readFileSync(answersFilePath, 'utf8'))
  } catch (error) {
    return false
  }
  return !fs.existsSync(answersFilePath) || !answers || answers.lenght > 0 ? false : true
}

function getAnswers() {
  try {
    if (!checkAnswersFileExist()) return
    const answersFilePath = path.join(path.resolve(__dirname, '../tmp'), "answers.json")
    const answers = JSON.parse(fs.readFileSync(answersFilePath, 'utf8'))

    return answers
  } catch (error) {
    console.log(error)
  }
}

function saveAnswers(answers) {
  try {
    const answersFilePath = path.join(path.resolve(__dirname, '../tmp'), "answers.json")

    if (!fs.existsSync(answersFilePath)) {
      fs.mkdirSync(path.join(path.resolve(__dirname, '../tmp')), { recursive: true })
    } else {
      fs.unlink(answersFilePath, (err) => {
        if (err) throw err;
      })
    }
    fs.writeFileSync(answersFilePath, JSON.stringify(answers, null, 2), 'utf8')
  } catch (error) {
    console.log(error)
  }
}

function clearConsoleAndTips() {
  process.stdout.write('\x1Bc')

  console.log(coolTerminalText)
  console.log(tips)
}

export {
  getProjects,
  getProjectsObject,
  checkExistFile,
  checkAnswersFileExist,
  getAnswers,
  saveAnswers,
  clearConsoleAndTips
}