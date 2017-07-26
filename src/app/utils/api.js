
export const handleApiError = (err, callback) => {
  console.log('Api error :', err)
  if (callback) callback(err)
}

export const handleApiResult = (err, res, callback) => {
  if (err) {
    console.log('Api error :', err)
    if (callback) callback(err)
  }

  console.log('Api success')
  if (callback) callback(null, res.body)
}
