const { setDemoOne, getDemoOne } = require('../../databases/redis')

export const demoHandler = async value => {
  const result = {
    value: null,
    error: null
  }

  try {
    await setDemoOne(value)
    result.value = await getDemoOne()
  } catch (error) {
    result.error = 'An unknow error happened, try refreshing the page'

    return result
  }

  return result
}

export const basicDemoHandler = async () => { 'test succeeded' }
