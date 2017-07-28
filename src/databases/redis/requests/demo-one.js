module.exports = redis => ({
  setDemoOne: value => {
    redis.set('demo-one', value)
  },
  getDemoOne: async () => redis.get('demo-one')
})
