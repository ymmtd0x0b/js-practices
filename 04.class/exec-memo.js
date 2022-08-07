const opts = require('minimist')(process.argv)
const fs = require('fs')
const MemoExecutor = require('./lib/memo/memo-executor.js')

const main = async () => {
  await MemoExecutor.build()

  try {
    if (opts.l) {
      await MemoExecutor.showList()
    } else if (opts.r) {
      await MemoExecutor.showReview()
    } else if (opts.d) {
      await MemoExecutor.delete()
    } else {
      const inputData = fs.readFileSync('/dev/stdin', 'utf8')
      await MemoExecutor.add(inputData)
    }
  } catch (e) {
    console.log(e.message)
  }

  await MemoExecutor.destroy()
}

main()
