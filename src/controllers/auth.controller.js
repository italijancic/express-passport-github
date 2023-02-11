import * as authServices from '../services/auth.services.js'

export const login = async (req, res) => {
  try {

    const { email, password } = req.body
    const logged = await authServices.login(email, password)

    if (logged) {
      req.session.logged = true

      res.status(200).json({
        success: true,
        message: 'Logged user'
      })

    } else {
      res.status(401).json({
        success: false,
        message: 'Login error'
      })
    }

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

export const logout = async (req, res) => {
  try {
    req.session.destroy((error) => {
      if (error) {
        res.json(error)
      } else {
        res.status(200).json({
          success: true,
          message: 'Logout OK'
        })
      }
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}