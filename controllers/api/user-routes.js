const router = require('express').Router();
const {
    User,
    Post,
    Comment
} = require('../../models');

// Create a user
router.post('/', async(req, res) => {
    try{
        const checkExistingEmail = await User.findOne({
            where:{
                email: req.body.email
            }
        })
        if (checkExistingEmail){
            console.log("Email already in use. Please try a different email");
            res.status(400).json({message:"Email already in use"})
            return
        }

        const dbUserData = await User.create({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email
        });

        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;

            res.status(200).json(dbUserData);
        });
    }
    catch(err){
        res.status(500).json(err);
    }
})

router.post("/login",async(req,res)=>{
    try{
        const dbUserData = await user.findOne({
            where:{
                email:req.body.email
            }
        });
        if (!dbUserData){
            console.log("there is no user that exist with that email");
            res.status(400).json({message:"incorrect email or password"})
            return;
        }
        const validpassword = await dbUserData.checkPassword(req.body.password)
        if (!validpassword){
            console.log("wrong password");
            res.status(400).json({message:"incorrect email or password"})
        }
        req.session.save(()=>{
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;
            res.status(200).json({user:dbUserData,message:"logged in"})
        })
    }catch(err){
        console.log(err);
        err ? res.status(500).json(err):console.log("successfully created user")
    }
})
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;