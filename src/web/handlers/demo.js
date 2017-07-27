const { setDemoOne, getDemoOne } = require('../../databases/redis')

export default async function demoHandler(value) {
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
