const { connect } = require('getstream')
const StreamChat = require('stream-chat').StreamChat
const crypto = require('crypto')
const bcrypt = require('bcrypt')

const dotenv = require('dotenv')

dotenv.config();

const api_key = process.env.STEAM_API_KEY
const api_secret = process.env.STEAM_API_SECRET
const app_id = process.env.STEAM_APP_ID

const signup = async (req, res) => {
  try {
    const { fullName, username, phoneNumber, password } = req.body

    const userId = crypto.randomBytes(16).toString('hex')

    const hashPassword = await bcrypt.hash(password, 10)

    // const serverClient = connect(api_key, api_secret, app_id)
    const serverClient = StreamChat.getInstance(api_key, api_secret)

    const token = serverClient.createToken(userId)

    return res
      .status(200)
      .json({ token, userId, fullName, username, hashPassword, phoneNumber })
  } catch (error) {
    return res.status(500).json({ message: error })
  }
}

const login = async (req, res) => {
  try {
    const { username, password } = req.body

    const serverClient = connect(api_key, api_secret, app_id)

    const client = StreamChat.getInstance(api_key, api_secret)

    const { users } = await client.queryUsers({ name: username })

    if (!users.length) return res.status(400).json({ message: 'User not found' })

    const success = await bcrypt.compare(password, users[0].hashPassword)

    const token = serverClient.createUserToken(users[0].id)

    if (success) {
      res.status(200).json({
        token,
        fullName: users[0].fullName,
        username,
        userId: users[0].id,
      })
    } else {
      res.status(400).json({ message: 'Incorrect Password' })
    }
  } catch (error) {
    console.log('Error: ', error)
    res.status(500).json({ message: error })
  }
}

module.exports = { login, signup }
