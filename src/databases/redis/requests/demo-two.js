module.exports = redis => ({
  setDemoTwo: (value) => {
    redis.set(`demo-two`, value);
  },
  getDemoTwo: async () => (
    await redis.get(`demo-two`)
  )
});
