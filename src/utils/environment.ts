import 'dotenv/config'

export const environment = {
  mongoURI: process.env.MONGO_DB_URL || 'mongodb://localhost:27017/alol-planning'
}
