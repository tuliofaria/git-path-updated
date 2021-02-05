#!/usr/bin/env node

const fs = require('fs')
const yargs = require('yargs/yargs')

const execShellCommand = (cmd) => {
  const exec = require('child_process').exec
  return new Promise((resolve, reject) => {
    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        console.warn(error)
        reject(error)
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
    const { path, showDiff } = argv
    const output = await execShellCommand(
      'git diff --exit-code HEAD^ HEAD -- ' + path
    )

    if (showDiff) {
      console.log(' ===== diff ====')
      console.log(output)
      console.log(' ===== /diff ====')
    }

    if (output.length === 0) {
      console.log('nothing changed')
      process.exitCode = 0
    } else {
      console.log('changes in this path')
      process.exitCode = 1
    }
  }
}
run()
