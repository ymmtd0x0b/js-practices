const { Select } = require('enquirer')

class SelectWithChoicesInfo extends Select {
  constructor (options = {}) {
    super(options)
    this.idx = 0
    this.max_idx = this.choices.length - 1
  }

  up () {
    this.idx--
    if (this.idx < 0) {
      this.idx = this.max_idx
    }
    super.up()
  }

  down () {
    this.idx++
    if (this.idx > this.max_idx) {
      this.idx = 0
    }
    super.down()
  }

  footer () {
    if (this.state.submitted && !this.state.cancelled) return ''
    return '\n'.concat(this.choices[this.idx].name)
  }
}

const select = (data) => {
  return new SelectWithChoicesInfo({
    name: 'Choice',
    message: 'Choose a note you want to see:',
    choices: data
  })
}

function formatData (cache) {
  const data = []
  for (const idx in cache) {
    const id = `${idx}) `
    const text = `${cache[idx].content.split('\n', 1)}`
    data.push({ name: id + text, value: idx })
  }
  return data
}

exports.selectPrompt = async (data) => {
  const fdata = formatData(data)
  const dataName = await select(fdata).run()
  const selectedData = fdata.find(d => d.name === dataName)
  return selectedData.value
}
// selectPrompt(memos)
