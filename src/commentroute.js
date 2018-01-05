var express = require('express');
var commentroute  =  express.Router();
var Comment = require('../model/comments');


commentroute.route('/')
    .get(function(req,res){
            Comment.find(function(err,comments){
               if(err)
              res.send(err);
              res.json(comments)
    });
})

    .post(function(req,res){
    var comment = new Comment();
    comment.author = req.body.author;
    comment.text=req.body.text;
    
    comment.save(function(err){
        if(err)
            res.send(err);
        res.json({message:"Comment successfully Added!!"});
    });
});

module.exports = commentroute;