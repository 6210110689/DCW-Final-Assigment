const bodyParser = require('body-parser')
const express = require('express')
const cors = require('cors')
const axios = require('axios')
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const app = express()
const port = 8080

const TOKEN_SECRET ='315bf8822770b897b8ae124799b2e34e82036976703b8be05184718672983a97d7188ded86403e0bc091e4deb6f6b12f28477dd52debde110b02bb3396c0d923'

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

mongoose.connect('mongodb://localhost:login/',
  ()=> console.log('completed connect to DB')
)
let User = mongoose.model('User', { fields: String });
let adduser = new User({fields: 'test'});
//adduser.save().then(()=>console.log('add'));

app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/api/login',bodyParser.json(),async (req,res) => {
  let token = req.body.token
  let result = await axios.get('https://graph.facebook.com/me',{
      params:{
          fields: 'id,name,email',
          access_token: token
      }
  })
  
  if(!result.data.id){
      res.sendStatus(403)
      return
  }   
  let data = {
      username: result.data.email
  }
  let access_token = jwt.sign(data, TOKEN_SECRET, {expiresIn: '1800s'})

  res.send({access_token, username: data.username})
        
})


app.get('/api/info', authenticated,(req, res) => {
  res.send({ok: 1, username: req.username})
})


app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
