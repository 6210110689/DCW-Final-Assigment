const bodyParser = require('body-parser')
const express = require('express')
const cors = require('cors')
const axios = require('axios')
const mongoose = require('mongoose');
const app = express()
const port = 8080

const authenticated = (req, res, next) => {
  const auth_header = req.headers['authorization']
  const token = auth_header && auth_header.split(' ')[1]
  if(!token)
      return res.sendStatus(401)
  jwt.verify(token,TOKEN_SECRET, (err,info) => {
      if(err) return res.sendStatus(403)
      req.username = info.username
      next()
  })
}

mongoose.connect('mongodb://localhost:8080/info',
  ()=> console.log('completed connect to DB')
)

app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/api/login', bodyParser.json(), async (req, res) => {
    let token = req.body.token
    let result = await axios.get('https://graph.facebook.com/me', {
        params: {
            fields: 'id,name,email',
            access_token: token
        }
    })
    console.log(result.data)
    res.send({ok: 1})
})

app.get('/api/info', authenticated,(req, res) => {
  res.send({ok: 1, username: req.username})
})


app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
