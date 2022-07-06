function main () {
  const tmp = process.argv.slice(2, 6).map((n) => n.replace(/^-(.+)/, '$1'))
  const paramsArray = [...Array(2)].map((_, i) => tmp.slice(i * 2, i * 2 + 2))
  const params = Object.fromEntries(paramsArray)

  const year = params.y ? params.y : new Date().getFullYear()
  const month = params.m ? params.m : new Date().getMonth() + 1

  console.log(generateCal(year, month))
}

function generateCal (year, month) {
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

  const weeks = [...Array(6)].map((_, i) => {
    const start = i * 7 // 第i週
    const end = start + 7 // 第i週の7日分
    return rjustDays.slice(start, end).join(' ')
  })

  return weeks.join('\n')
}

main()
