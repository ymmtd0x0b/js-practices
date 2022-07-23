// 標準入力の受け取り
function getStdin (fs) {
  return fs.readFileSync('/dev/stdin', 'utf8')
}

// Database操作
function initTable (db) {
  // db.run('DROP TABLE IF EXISTS memos') // テーブル削除
  db.run('CREATE TABLE IF NOT EXISTS memos(id INTEGER primary key, content TEXT)') // テーブル作成
}

const setData = (db, data) => new Promise(resolve => {
  if (!data.match(/^\n$/)) {
    db.run('INSERT INTO memos(content) VALUES(?)', data)
  }
  resolve()
})

const getData = (db) => new Promise(resolve => {
  const rows = []
  db.serialize(() => {
    db.each('SELECT * FROM memos', (_, row) => {
      rows.push(row)
    }, (_, count) => { resolve(rows) })
  })
})

const deleteData = (db, data) => new Promise(resolve => {
  db.serialize(() => {
    db.run('DELETE FROM memos WHERE id = ?', data.id)
  })
})

async function main () {
  const fs = require('fs')
  const sqlite3 = require('sqlite3').verbose()
  const opts = require('minimist')(process.argv.slice(2))

  const db = new sqlite3.Database('./db/memo.db')
  initTable(db)

  if (opts.l) {
    const cache = await getData(db)
    if (cache.length === 0) {
      console.log('Not Data')
      return
    }

    for (const data in cache) {
      const line = cache[data].content.split('\n')[0]
      console.log(line)
    }
  } else if (opts.r) {
    const cache = await getData(db)
    if (cache.length === 0) {
      console.log('Not Data')
      return
    }

    const selectedID = await require('./enquirer.js').selectPrompt(cache)
    const memo = cache[selectedID]
    console.log(`\n${memo.content}`)
  } else if (opts.d) {
    const cache = await getData(db)
    if (cache.length === 0) {
      console.log('Not Data')
      return
    }

    const targetID = await require('./enquirer.js').selectPrompt(cache)
    const memo = cache[targetID]
    deleteData(db, memo)
  } else {
    const memo = getStdin(fs)
    setData(db, memo)
  }

  db.close()
}
main()
