const fs = require('fs')
const ExtendedSelect = require('./lib/prompt/select-extend-footer.js')
const Memo = require('./lib/memo.js')

const selectPrompt = (memos, { optMsg }) => {
  const data = []
  for (const idx in memos) {
    const lines = memos[idx].text.split('\n')
    data.push(
      {
        name: lines[0],
        footer: lines.slice(1).join('\n')
      })
  }

  return new ExtendedSelect({
    name: 'Choice',
    message: `Choose a note you want to ${optMsg}:`,
    choices: data
  })
}

const main = async () => {
  const opts = require('minimist')(process.argv.slice(2))

  if (opts.l) {
    const memos = await Memo.all()

    for (const idx in memos) {
      const line = memos[idx].text.split('\n')[0]
      console.log(line)
    }
  } else if (opts.r) {
    const memos = await Memo.all()
    if (memos.length === 0) return

    const prompt = selectPrompt(memos, { optMsg: 'see' })
    const idx = await prompt.run()
    const memo = memos[idx]
    console.log(`\n${memo.text}`)
  } else if (opts.d) {
    const memos = await Memo.all()
    if (memos.length === 0) return

    const prompt = selectPrompt(memos, { optMsg: 'see' })
    const idx = await prompt.run()
    await Memo.destroy(memos[idx].id)
  } else {
    const inputData = fs.readFileSync('/dev/stdin', 'utf8')
    await Memo.save(inputData)
  }

  await Memo.close()
}
main()
