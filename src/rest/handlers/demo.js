const { setDemoOne, getDemoOne } = require('../../databases/redis');

async function demoHandler(value) {
  let result = {
    value: null,
    error: null
  };

  try {
    await setDemoOne(value);
    result.value = await getDemoOne();
  } catch (error) {
    console.error(error);

    result.error = 'An unknow error happened, try refreshing the page';

    return result;
  }

  return result;
};

async function basicDemoHandler() {
  return 'test succeeded'
}

module.exports = {
  demoHandler,
  basicDemoHandler
};
