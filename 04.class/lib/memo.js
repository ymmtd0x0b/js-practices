const sqlite3 = require('sqlite3').verbose()

class Memo {
  static async open () {
    this.db = new sqlite3.Database('./db/memo.db')
    this.db.run('CREATE TABLE IF NOT EXISTS memos(id INTEGER primary key, text TEXT)')
  }

  static all () {
    return new Promise(resolve => {
      this.db.all('SELECT * FROM memos', (_, rows) => resolve(rows))
    })
  }

  static save (data) {
    return new Promise(() => {
      this.db.run('INSERT INTO memos(text) VALUES(?)', data)
    })
  }

  static destroy (id) {
    return new Promise(() => {
      this.db.run('DELETE FROM memos WHERE id = ?', id)
    })
  }

  static close () {
    return new Promise(resolve => {
      this.db.close()
    })
  }
}

module.exports = Memo
