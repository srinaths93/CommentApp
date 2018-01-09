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

commentroute.route('/:comment_id')
    .put(function(req,res){
        Comment.findById(req.params.comment_id,function(err,comment){
            if(err){
                res.send(err);
            }
            (req.body.author)? comment.author = req.body.author : null;
            (req.body.text)? comment.text = req.body.text : null;
            comment.save(function(err){
                if(err){
                    res.send(err);
                }
                res.json({message: 'Comment has been updated'});
            });
        });
    })
    .delete(function(req,res){
        Comment.remove({ _id : req.params.comment_id},function(err,comment){
            if(err){
                res.send(err);
            }
            res.json({message: 'Comment has been deleted'})
        });
    });

module.exports = commentroute;