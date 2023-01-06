import * as dotenv from 'dotenv'
dotenv.config()

const rootPath = process.env.ROOT_PATH || "~/www/"

const projectNames = JSON.parse(process.env.PROJECT_NAMES)

export {
  rootPath,
  projectNames
}