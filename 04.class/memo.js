const fs = require('fs')
const MemoDB = require('./database.js')
const enquirer = require('./enquirer.js')

const main = async () => {
  const opts = require('minimist')(process.argv.slice(2))
  const db = new MemoDB()

  if (opts.l) {
    const cache = await db.selectAll()
    if (cache.length === 0) {
      console.log('Not Data')
      return
    }

    for (const data in cache) {
      const line = cache[data].content.split('\n')[0]
      console.log(line)
    }
  } else if (opts.r) {
    const cache = await db.selectAll()
    if (cache.length === 0) {
      console.log('Not Data')
      return
    }

    const selectedIdx = await enquirer.selectPrompt(cache, 'see')
    const memo = cache[selectedIdx]
    console.log(`\n${memo.content}`)
  } else if (opts.d) {
    const cache = await db.selectAll()
    if (cache.length === 0) {
      console.log('Not Data')
      return
    }

    const targetID = await enquirer.selectPrompt(cache, 'delete')
    const memo = cache[targetID]
    db.delete(memo)
  } else {
    const memo = fs.readFileSync('/dev/stdin', 'utf8')
    db.insert(memo)
  }

  db.close()
}
main()
