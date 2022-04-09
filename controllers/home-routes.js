const router = require('express').Router();
const sequelize = require('../config/connection');
const {
    posts,
    user,
    comment
} = require('../models');
const withAuth = require('../utils/auth');

//Get all images
router.get('/', (req, res) => {
    posts.findAll({
            include: [{
                    model: comment,
                    include: {
                        model: user,
                        attributes: ['username',"id"]
                    }
                },
                {
                    model: user,
                    attributes: ['username']
                }
            ]
        })
        .then(dbPostData => {
            const postData = dbPostData.map(post => post.get({
                plain: true
            }));
            res.render('dashboard', {
                postData,
                loggedIn: req.session.loggedIn
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('signup');
});

//display single post
router.get("/post/:id",async(req,res)=>{
    try{
        console.log(req.params.uuid);
        const dbPostData= await posts.findAll({
            where: {
                id: req.params.id
            },
            include:[
                {
                    model:comment,
                    include:[{
                        model:user,
                        attributes:["username","id"]
                    }] 
                },
                {
                    model:user,
                    attributes:["username","id"]
                }
            ]
        });
        var postsMap = dbPostData.map((postsData)=>
            postsData.get({plain:true})
        );
        postsMap=postsMap[0]
        if (req.session.user_id) {
            for (let key in postsMap["comments"]) {
                postsMap["comments"][key]["userLoggedIn"]=req.session.user_id
            }
        }
        console.log("postsMap");
        console.log(postsMap);
        res.render("single-post",{
            loggedIn:req.session.loggedIn,
            postData:postsMap,
            userLoggedIn:req.session.user_id,
            id: req.params.id,
        })
    }catch(err){
        console.log(err);
        res.status(500)
    }
})

router.get('*', (req, res) => {
    console.log(req.params);
    res.redirect('/');
})
module.exports = router;