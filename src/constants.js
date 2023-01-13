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

export {
  COMMANDS,
  FILE_TYPES,
}