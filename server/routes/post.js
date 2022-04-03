const router = require("express").Router();
const Post = require("../models/Post");
const logger = require('../datalog/datalog')
const jwt = require('jsonwebtoken')

function verifyToken(req,res,next){
    const auth_header = req.headers['authorization']
    const token = auth_header && auth_header.split(' ')[1]
    if(!token) 
        return res.sendStatus(401)
    jwt.verify(token, process.env.TOKEN_SECRET, (err, info) => {
        if(!token) return res.sendStatus(403)
        req.username = info.username
        next()
    })
}

router.post('/',verifyToken,async (req,res)=>{
    const post = new Post({
        name: req.username,
        msg: req.body.msg
    })
    try{
        const result = await post.save()
        logger.book.log('info','Post message by ' + req.username);
        res.json(result)
    }catch(err){
        logger.book.log('error','error');
        res.json({err: err})
    }
})

//UPDATE POST
router.put("/:id", async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (post.username === req.body.username) {
        try {
          const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            {
              $set: req.body,
            },
            { new: true }
          );
          res.status(200).json(updatedPost);
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(401).json("You can update only your post!");
      }
    } catch (err) {
      res.status(500).json(err);
    }
});
  
  //DELETE POST
  router.delete("/:id", async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (post.username === req.body.username) {
        try {
          await post.delete();
          res.status(200).json("Post has been deleted...");
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(401).json("You can delete only your post!");
      }
    } catch (err) {
      res.status(500).json(err);
    }
});

//GET POST
router.get("/:id", async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      res.status(200).json(post);
    } catch (err) {
      res.status(500).json(err);
    }
});

router.get('/allPost', async (req,res)=>{
    try{
        const result = await Post.find()
        res.json(result)
    }catch(err){
        res.json({err : err})
    }
})


module.exports = router;