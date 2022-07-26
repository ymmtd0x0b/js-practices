const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./db/memo.db')

class Memo {
  static async open () {
    db.run('CREATE TABLE IF NOT EXISTS memos(id INTEGER primary key, text TEXT)')
  }

  static all () {
    return new Promise(resolve => {
      db.all('SELECT * FROM memos', (_, rows) => resolve(rows))
    })
  }

  static save (data) {
    return new Promise(() => {
      db.run('INSERT INTO memos(text) VALUES(?)', data)
    })
  }

  static destroy (id) {
    return new Promise(() => {
      db.run('DELETE FROM memos WHERE id = ?', id)
    })
  }

  static close () {
    return new Promise(resolve => {
      db.close()
    })
  }
}

module.exports = Memo
