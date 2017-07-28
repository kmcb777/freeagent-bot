module.exports = redis => ({
  setDemoTwo: value => {
    redis.set('demo-two', value)
  },
  getDemoTwo: async () => redis.get('demo-two')
})
