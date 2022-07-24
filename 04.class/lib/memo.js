const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./db/memo.db')
db.run('CREATE TABLE IF NOT EXISTS memos(id INTEGER primary key, content TEXT)')

class memo {
  static all () {
    return new Promise(resolve => {
      const rows = []
      db.each('SELECT * FROM memos', (_, row) => {
        rows.push(row)
      }, (_, count) => { resolve(rows) })
    })
  }

  static save (data) {
    return new Promise(resolve => {
      db.run('INSERT INTO memos(content) VALUES(?)', data)
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

module.exports = memo
