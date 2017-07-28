
export const handleApiError = (err, callback) => {
  if (callback) callback(err)
}

export const handleApiResult = (err, res, callback) => {
  if (err) {
    if (callback) callback(err)
  }

  if (callback) callback(null, res.body)
}
