import chalk from "chalk"

export const log = {
  info: (...text: string[]): void => {
    console.log(chalk.cyan("[info] ", ...text))
  },
  success: (...text: string[]): void => {
    console.log(chalk.green("[success] ", ...text))
  },
  warn: (...text: string[]): void => {
    console.log(chalk.yellow("[warn] ", ...text))
  },
  error: (...text: string[]): void => {
    console.log(chalk.red("[error] ", ...text))
  },
  whispered: (...text: string[]): void => {
    console.log(chalk.gray("[whispered] ", ...text))
  },
}
