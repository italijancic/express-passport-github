export const auth = (req, res, next) => {
  if (req.session.logged) {
    req.session.touch()
    next()
  } else {
    res.status(403).json({
      success: false,
      message: 'Logged error'
    })
  }
}