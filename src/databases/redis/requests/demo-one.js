module.exports = redis => ({
  setDemoOne: (value) => {
    redis.set(`demo-one`, value);
  },
  getDemoOne: async () => (
    await redis.get(`demo-one`)
  )
});
