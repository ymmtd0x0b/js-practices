const { Select } = require('enquirer')

class SelectWithDiscription extends Select {
  async submit () {
    this.state.submitted = true
    this.state.validating = true

    if (this.options.onSubmit) {
      await this.options.onSubmit.call(this, this.name, this.value, this)
    }

    const result = this.state.error || await this.validate(this.value, this.state)
    if (result !== true) {
      let error = '\n' + this.symbols.pointer + ' '

      if (typeof result === 'string') {
        error += result.trim()
      } else {
        error += 'Invalid input'
      }

      this.state.error = '\n' + this.styles.danger(error)
      this.state.submitted = false
      await this.render()
      await this.alert()
      this.state.validating = false
      this.state.error = undefined
      return
    }

    this.state.validating = false
    await this.render()
    await this.close()

    this.emit('submit', this.index) // オーバーライド部分
  }

  footer () {
    if (this.state.submitted && !this.state.cancelled) return ''
    return '\n' + this.selected.discription // オーバーライド部分
  }
}

module.exports = SelectWithDiscription
