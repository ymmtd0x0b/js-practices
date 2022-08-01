const opts = require('minimist')(process.argv)
const fs = require('fs')
const SelectWithDiscription = require('./lib/prompt/select-with-discription.js')
const Memo = require('./lib/memo.js')

class MemoExcutor {
  static async build () {
    await Memo.open()
  }

  static async destroy () {
    await Memo.close()
  }

  static async showMemoList () {
    const memos = await Memo.all()

    for (const idx in memos) {
      const line = memos[idx].text.split('\n')[0]
      console.log(line)
    }
  }

  static async showMemoReview () {
    const memos = await Memo.all()
    if (memos.length === 0) return

    const prompt = this.#selectPrompt(memos, { optMsg: 'see' })
    const idx = await prompt.run()

    const memo = memos[idx]
    console.log(`\n${memo.text}`)
  }

  static async deleteMemo () {
    const memos = await Memo.all()
    if (memos.length === 0) return

    const prompt = this.#selectPrompt(memos, { optMsg: 'delete' })
    const idx = await prompt.run()

    await Memo.destroy(memos[idx].id)
  }

  static async createMemo () {
    const inputData = fs.readFileSync('/dev/stdin', 'utf8')
    await Memo.save(inputData)
  }

  static #selectPrompt (memos, { optMsg }) {
    const data = []
    for (const idx in memos) {
      const lines = memos[idx].text.split('\n')
      data.push(
        {
          name: lines[0],
          discription: lines.slice(1).join('\n')
        })
    }

    return new SelectWithDiscription({
      name: 'Choice',
      message: `Choose a note you want to ${optMsg}:`,
      choices: data
    })
  }
}

const main = async () => {
  MemoExcutor.build()

  if (opts.l) {
    await MemoExcutor.showMemoList()
  } else if (opts.r) {
    await MemoExcutor.showMemoReview()
  } else if (opts.d) {
    await MemoExcutor.deleteMemo()
  } else {
    await MemoExcutor.createMemo()
  }

  MemoExcutor.destroy()
}

main()
