const bodyParser = require('body-parser')
const express = require('express')
const cors = require('cors')
const axios = require('axios')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const app = express()
const port = 8080
const Post = require('./routes/post')
const logger = require('./datalog/datalog')
const TOKEN_SECRET ='315bf8822770b897b8ae124799b2e34e82036976703b8be05184718672983a97d7188ded86403e0bc091e4deb6f6b12f28477dd52debde110b02bb3396c0d923'

app.use(cors())
app.use(bodyParser.json())
dotenv.config();
app.use('/api',Post)

mongoose.connect(process.env.MONGO_URL.toString(), {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  })
.then(console.log('conect DB'))
;

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/api/login', bodyParser.json(), async (req, res) => {
  let token = req.body.token
  let result = await axios.get('https://graph.facebook.com/me', {
      params: {
          fields: 'id,name,email,picture',
          access_token: token
      }
  })
  if(!result.data.id){
      logger.book.log('error',result.data.name + 'error 403');
      res.sendStatus(403)
      return
  }
  let data = { username: result.data.name }
  let access_token = jwt.sign(data, 
      TOKEN_SECRET, 
      {expiresIn: '1800s'}
  )
  try{
      logger.book.log('info',result.data.name + ' has login success');
      res.send({access_token,result:result.data})
  }catch(err){
      res.send(err)
  }
})



app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
