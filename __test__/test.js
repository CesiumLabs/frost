import pico from 'picocolors'
const tests = []
function test (name, fn) {
  tests.push({ name, fn })
}
function run () {
  tests.forEach((t) => {
    try {
      t.fn()
      console.log(`${pico.green('✔︎')}`, t.name)
    } catch (e) {
      console.log(`${pico.red('✘')}`, t.name)
      console.log(e.stack)
    }
  })
}

const files = process.argv.slice(2)
global.testStack = test
files.forEach(async (file) => {
  await import(file)
})
run()
