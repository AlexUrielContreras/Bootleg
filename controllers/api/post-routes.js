const router = require("express").Router()
const multer  = require('multer')
const sharp = require('sharp');
const withAuth = require("../../utils/auth");
const { Post } = require("../../models")
//const upload=require("../../utils/multerMiddleware")
const upload = multer({ dest: './public/images/' })
const { v4: uuidv4 } = require('uuid');

//create post
router.post("/", withAuth, upload.single("image"), async (req, res) => {
  try { 
    const data = await sharp(req.files.image_input.data)
      .resize(380, 500, {
        fit: sharp.fit.inside,
        withoutEnlargement: true,
      }).toBuffer();
        Post.create({
          img: data,
          caption: req.files.image_input.name,
          user_id: req.session.user_id,
        });
    res.redirect("/");
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

//delete a post with the given id
router.delete("/",async (req,res)=>{
    try{
        const checkPost=await Post.findByPk(req.body.id)
        if (checkPost.dataValues.user_id==req.session.user_id){
            Post.destroy({
                where:{
                    id:req.body.id
                }
            })
            console.log(req.body.id);
            res.status(200).json()
        }else{
            res.status(500).json()
        }
    }catch(err){
        res.status(500).json(err)
    }
});
module.exports=router
