import { User } from '../models/User.model.js'
import bcrypt from 'bcrypt'

export const createUser = async (data) => {
  try {
    const foundedUser = await getUser(data.email)

    if (foundedUser) {
      throw new Error('User Already exist')
    } else {
      // password encrypt
      data.password = bcrypt.hashSync(data.password, bcrypt.genSaltSync(10))
      const createdUser = await User.create(data)
      return createdUser
    }

  } catch (error) {
   throw new Error(error.message)
  }
}

export const getUser = async (email) => {
  try {
    const users = await User.find({ email }).lean()
    return users[0]
  } catch (error) {
    throw new Error('Error searching user')
  }
}

export const updateUser = async (email, data, updatePassword=false) => {
  try {
    const user = await getUser(email)

    if (user) {

      if (data.password) {
        if (updatePassword) {
          data.password = bcrypt.hashSync(data.password, bcrypt.genSaltSync(10))
        } else {
          delete data.password
        }
      }

      const updatedUser = await User.findOneAndUpdate({ email }, { ...data }, {new: true}).lean()
      return updatedUser
    }

  } catch (error) {
    throw new Error(error.message)
  }
}