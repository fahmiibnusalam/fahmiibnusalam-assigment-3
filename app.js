const express = require("express")
const app = express()
const router = require("./routers")
const PORT = 3000
const env = process.env.NODE_ENV

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(router)

if (env !== "test") {
  app.listen(PORT, () => {
    console.log(`Server listening on Port: ${PORT}`)
  })
}

module.exports = app
