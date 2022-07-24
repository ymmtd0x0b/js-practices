const fs = require('fs')
const enquirer = require('./lib/enquirer.js')
const Memo = require('./lib/memo.js')

const main = async () => {
  const opts = require('minimist')(process.argv.slice(2))

  if (opts.l) {
    const memos = await Memo.all()
    if (memos.length === 0) {
      console.log('No Data')
      return
    }

    for (const idx in memos) {
      const line = memos[idx].content.split('\n')[0]
      console.log(line)
    }
  } else if (opts.r) {
    const memos = await Memo.all()
    if (memos.length === 0) {
      console.log('No Data')
      return
    }

    const selectedIdx = await enquirer.selectPrompt(memos, 'see')
    const memo = memos[selectedIdx]
    console.log(`\n${memo.content}`)
  } else if (opts.d) {
    const memos = await Memo.all()
    if (memos.length === 0) {
      console.log('No Data')
      return
    }

    const idx = await enquirer.selectPrompt(memos, 'delete')
    await Memo.destroy(memos[idx].id)
  } else {
    const inputData = fs.readFileSync('/dev/stdin', 'utf8')
    await Memo.save(inputData)
  }

  await Memo.close()
}
main()
