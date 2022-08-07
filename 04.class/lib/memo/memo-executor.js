const SelectWithDiscription = require('../prompt/select-with-discription.js')
const Memo = require('./memo.js')

class MemoExecutor {
  static async build () {
    await Memo.open()
  }

  static async destroy () {
    await Memo.close()
  }

  static async showList () {
    const memos = await Memo.all()
    if (memos.length === 0) await Promise.reject(new Error('データがありません'))

    for (const idx in memos) {
      const line = memos[idx].text.split('\n')[0]
      console.log(line)
    }
  }

  static async showReview () {
    const memos = await Memo.all()
    if (memos.length === 0) await Promise.reject(new Error('データがありません'))

    const prompt = this.#selectPrompt(memos, { optMsg: 'see' })
    const idx = await prompt.run()

    const memo = memos[idx]
    console.log(`\n${memo.text}`)
  }

  static async delete () {
    const memos = await Memo.all()
    if (memos.length === 0) await Promise.reject(new Error('データがありません'))

    const prompt = this.#selectPrompt(memos, { optMsg: 'delete' })
    const idx = await prompt.run()

    await Memo.destroy(memos[idx].id)
  }

  static async add (data) {
    await Memo.save(data)
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

module.exports = MemoExecutor
