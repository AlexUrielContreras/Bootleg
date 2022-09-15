/*
 the purpose of this route is to create comments and delete them. 
 */
const router = require('express').Router();
const {
    User,
    Post,
    Comment
} = require('../../models');
const withAuth = require('../../utils/auth');

//Delete a comment
router.delete("/", async (req,res)=>{
    console.log(req.body)
    try{
        Comment.destroy({
            where:{
                id:req.body.id
            }
        })
        res.status(200).json()
    }catch(err){
        console.log(err);
        res.status(500).json(err)
    }
});

//Create a comment
router.post('/', withAuth, (req, res) => {
    console.log(req.body);
    Comment.create({
        content: req.body.content,
        post_id: req.body.post_id,
        user_id: req.session.user_id
    })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
});

//Edit post
router.post("/edit",withAuth,async (req,res)=>{
    try{
        console.log(req.body);
        const checkRow = await Comment.findByPk(req.body.id)
        console.log(checkRow);
        if (checkRow.dataValues.user_id==req.session.user_id){
            console.log("user owns comment");
        }else{
            res.status(500).json()
        }
        const updatedrow= await Comment.update(
            {
                content:req.body.message
            },
            {
                where:{id:req.body.id}
            }
        )
        console.log(updatedrow);
        res.status(200).json()
    }
    catch(err){
        console.log(err);
        res.status(500).json()
    }
})

module.exports = router;