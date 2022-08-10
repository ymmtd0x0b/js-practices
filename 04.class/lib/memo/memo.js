const sqlite3 = require('sqlite3').verbose()

class Memo {
  static async open () {
    return new Promise(resolve => {
      this.db = new sqlite3.Database('./db/memo.db')
      this.db.run('CREATE TABLE IF NOT EXISTS memos(id INTEGER primary key, text TEXT)', () => resolve())
    })
  }

  static all () {
    return new Promise(resolve => {
      this.db.all('SELECT * FROM memos', (_, rows) => resolve(rows))
    })
  }

  static save (data) {
    return new Promise(resolve => {
      this.db.run('INSERT INTO memos(text) VALUES(?)', data, () => resolve())
    })
  }

  static destroy (id) {
    return new Promise(resolve => {
      this.db.run('DELETE FROM memos WHERE id = ?', id, () => resolve())
    })
  }

  static close () {
    return new Promise(resolve => {
      this.db.close(() => resolve())
    })
  }
}

module.exports = Memo
