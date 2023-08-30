const mongoose = require('mongoose')

const DB = process.env.LOCAL_DATABASE || 'mongodb://127.0.0.1:27017/nasa'

mongoose.connection.once('open', () => {
  console.log('MongoDB connection is ready! Database connected successfully.')
})
mongoose.connection.on('error', err => {
  console.error(err)
})

async function mongoConnect() {
  await mongoose.connect(DB)
}

async function mongoDisconnect() {
  await mongoose.disconnect()
}

module.exports = {
  mongoConnect,
  mongoDisconnect,
}
