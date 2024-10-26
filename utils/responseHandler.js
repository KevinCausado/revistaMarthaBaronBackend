const responseHandler = {
  ok: (res, data = null) => {
    return res.status(200).json({
      message: 'Success',
      data
    })
  },

  created: (res, data = null) => {
    return res.status(201).json({
      message: 'Created succesfully',
      data
    })
  },

  updated: (res, data = null) => {
    return res.status(200).json({
      message: 'Resource updated succesfully',
      data
    })
  },

  deleted: (res, data = null) => {
    return res.status(200).json({
      message: 'Resource deleted succesfully',
      data: []
    })
  },
}

module.exports = responseHandler


