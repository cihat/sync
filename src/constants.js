import * as dotenv from 'dotenv'
dotenv.config()

const rootPath = process.env.ROOT_PATH || "~/www/"

const allProjectsDirName = process.env.ALL_PROJECTS_DIR_NAME || "www"

const projectNames = JSON.parse(process.env.PROJECT_NAMES)

export {
  rootPath,
  projectNames,
  allProjectsDirName
}