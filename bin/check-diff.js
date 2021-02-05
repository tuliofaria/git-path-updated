#!/usr/bin/env node

const fs = require('fs')
const yargs = require('yargs/yargs')

const execShellCommand = (cmd) => {
  const exec = require('child_process').exec
  return new Promise((resolve, reject) => {
    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        console.warn(error)
      }
      resolve(stdout ? stdout : stderr)
    })
  })
}

const run = async () => {
  const argv = yargs(process.argv).argv
  if (!argv.path) {
    console.log('wrong parameters. Try to pass: path')
  } else {
    const { path } = argv
    const output = await execShellCommand(
      'git diff --exit-code HEAD^ HEAD -- ./apps/alunotv-frontend'
    )
    console.log(output)
    /*
    if (result.data.merged) {
      console.log('pull request already merged')
      process.exitCode = 0
    } else {
      console.log('pull request not merged')
      process.exitCode = 1
    }*/
  }
}
run()
