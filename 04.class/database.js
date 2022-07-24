class MemoDB {
  constructor () {
    const sqlite3 = require('sqlite3').verbose()
    this.db = new sqlite3.Database('./db/memo.db')

    this.initTable()
  }

  initTable () {
    this.db.run('CREATE TABLE IF NOT EXISTS memos(id INTEGER primary key, content TEXT)') // テーブル作成
  }

  insert (data) {
    return new Promise(resolve => {
      if (!data.match(/^\n$/)) {
        this.db.run('INSERT INTO memos(content) VALUES(?)', data)
      }
      resolve()
    })
  }

  selectAll () {
    return new Promise(resolve => {
      const rows = []
      this.db.serialize(() => {
        this.db.each('SELECT * FROM memos', (_, row) => {
          rows.push(row)
        }, (_, count) => { resolve(rows) })
      })
    })
  }

  delete (data) {
    return new Promise(resolve => {
      this.db.serialize(() => {
        this.db.run('DELETE FROM memos WHERE id = ?', data.id)
      })
    })
  }

  close () {
    this.db.close()
  }
}

module.exports = MemoDB
