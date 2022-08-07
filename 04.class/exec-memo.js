const opts = require('minimist')(process.argv)
const fs = require('fs')
const MemoExecutor = require('./lib/memo/memo-executor.js')

const main = async () => {
  await MemoExecutor.build()

  if (opts.l) {
    await MemoExecutor.showList().catch(err => {
      console.log(err.message)
    })
  } else if (opts.r) {
    await MemoExecutor.showReview().catch(err => {
      console.log(err.message)
    })
  } else if (opts.d) {
    await MemoExecutor.delete().catch(err => {
      console.log(err.message)
    })
  } else {
    const inputData = fs.readFileSync('/dev/stdin', 'utf8')
    await MemoExecutor.add(inputData)
  }

  await MemoExecutor.destroy()
}

main()
