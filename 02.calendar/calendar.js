function main () {
  const params = require('minimist')(process.argv.slice(2))

  const year = params.y ? params.y : new Date().getFullYear()
  const month = params.m ? params.m : new Date().getMonth() + 1

  console.log(generate(year, month))
}

function generate (year, month) {
  return [
    `       ${month}月 ${year}`,
    '日 月 火 水 木 金 土',
    body(year, month)
  ].join('\n')
}

function body (year, month) {
  const firstDate = new Date(year, month - 1, 1)
  const lastDate = new Date(year, month, 0)

  const blanks = [...Array(firstDate.getDay())].map(() => '  ')
  const days = [...Array(lastDate.getDate())].map((_, i) => String(i + 1))
  const concatDays = blanks.concat(days)
  const rjustDays = concatDays.map(n => n.padStart(2, ' '))

  const weeks = [...Array(6)].map((_, i) => { // calコマンドに合わせて6週間分を生成する
    const start = i * 7 // 第i週
    const end = start + 7 // 第i週の7日分
    return rjustDays.slice(start, end).join(' ')
  })

  return weeks.join('\n')
}

main()
