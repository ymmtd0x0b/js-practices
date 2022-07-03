const range = [...Array(20)].map((_, i) => i + 1) // 1~20

range.forEach(n => {
  if (n % 3 === 0 && n % 5 === 0) {
    console.log('FizzBuzz')
  } else if (n % 3 === 0) {
    console.log('Fizz')
  } else if (n % 5 === 0) {
    console.log('Buzz')
  } else {
    console.log(n)
  }
})
