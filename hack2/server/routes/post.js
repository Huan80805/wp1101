import express from 'express'
import Post from '../models/post'
import moment from 'moment'

const router = express.Router()

// TODO 2-(1): create the 1st API (/api/allPosts)
router.get('/allPosts', async(req, res) => {
    try{
        const posts = await Post.find().sort({timestamp:-1})
        if (posts.length !== 0){
            res.status(200).send({"message":"success", "data":posts})
        }
        else res.status(403).send({"message":"error","data":null})
    }
    catch(error){
        res.status(403).send({"message":"error","data":null})
    }
    
})


// TODO 3-(1): create the 2nd API (/api/postDetail)
router.get('/postDetail', async(req, res) => {
    try{
        const post = await Post.findOne({postId:req.query.pid})
        if (post)res.status(200).send({"message":"success", "post":post})
        else res.status(403).send({"message":"error","post":null})
    }
    catch(error){
        res.status(403).send({"message":"error","post":null})
    }
    
})
// TODO 4-(1): create the 3rd API (/api/newPost)
router.post('/newPost', async(req, res) => {
    try{
        const newPost = new Post({
            postId:req.body.pid,
            title: req.body.title,
            content:req.body.content,
            timestamp:req.body.timestamp
        })
        const post = await newPost.save()
        if (post)res.status(200).send({"message":"success"})
        else res.status(403).send({"message":"error","post":null})
    }
    catch(error){
        res.status(403).send({"message":"error","post":null})
    }
    
})
// TODO 5-(1): create the 4th API (/api/post)

export default router