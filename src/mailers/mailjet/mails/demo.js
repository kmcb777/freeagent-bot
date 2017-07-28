export default mailjet => ({
  sendDemoEmail: async email => {
    const text = 'Test'
    const html = '<p>Test</p>'

    const dispatchOptions = {
      FromEmail: 'test@derniercri.io',
      FromName: 'Test',
      Subject: 'Test',
      'Text-part': text,
      'Html-part': html,
      Recipients: [{ Email: email }]
    }

    await mailjet.post('send').request(dispatchOptions)
  }
})
