const spawn = require('child_process').spawn

const command = {
  name: 'package',
  description: 'Give you a list of node moduels available.',
  alias: ['np'],
  run: async (toolbox) => {
    const {
      filesystem: { read, cwd },
      print: { success },
      prompt: { ask },
      system: { run },
      config: { loadConfig },
      config,
    } = toolbox

    const onExit = () => {
      success('Task complete!')
      if (process.platform === 'win32') {
        run(`rundll32 user32.dll,MessageBeep -MB_ICONEXCLAMATION`)
      } else {
        console.log('\u0007')
      }
    }

    const packageJson = read(cwd() + '/package.json', 'json')
    if (packageJson) {
      const options = Object.keys(packageJson.scripts)
      const local = loadConfig('cogsprocket', cwd())
      const myConfig = {
        ...config,
        ...local,
      }
      const selectedOption = await ask({
        type: 'select',
        name: 'command',
        message: 'Select a command',
        choices: options,
      })

      const userOptions =
        (myConfig.package && myConfig.package[selectedOption.command]) || {}
      const child = spawn(`npm`, ['run', `${selectedOption.command}`], {
        shell: process.platform === 'win32',
        ...userOptions,
      })

      child.on('exit', onExit)

      process.stdin.pipe(child.stdin)
      child.stdout.pipe(process.stdout)
    }
  },
}

module.exports = command
