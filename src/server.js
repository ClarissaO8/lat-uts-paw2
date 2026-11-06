import app from './app.js'
import { APP_PORT } from './config/env.js'
import { connectDB } from './config/database.js'

await connectDB()

app.listen(APP_PORT, () => {
  console.log(`Perpustakaan API running on port ${APP_PORT}`)
})
