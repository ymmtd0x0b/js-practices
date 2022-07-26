const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./db/memo.db')

class Memo {
  static open () {
    return new Promise(resolve => {
      db.run('CREATE TABLE IF NOT EXISTS memos(id INTEGER primary key, text TEXT)')
      resolve()
    })
  }

  static all () {
    return new Promise(resolve => {
      db.all('SELECT * FROM memos', (_, rows) => {
        resolve(rows)
      })
    })
  }

  static save (data) {
    return new Promise(resolve => {
      db.run('INSERT INTO memos(text) VALUES(?)', data)
      resolve()
    })
  }

  static destroy (id) {
    return new Promise(resolve => {
      db.run('DELETE FROM memos WHERE id = ?', id)
      resolve()
    })
  }

  static close () {
    return new Promise(resolve => {
      db.close()
      resolve()
    })
  }
}

module.exports = Memo
