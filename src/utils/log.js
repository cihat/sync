import chalk from 'chalk';

export const log = (message, type) => {
  switch (type) {
    case 'error':
      console.log(chalk.red.bold(message))
      break;
    case 'success':
      console.log(chalk.green(message))
      break;
    case 'warning':
      console.log(chalk.yellow.bold(message))
      break;
    default:
      console.log(chalk.white(message))
  }
}
