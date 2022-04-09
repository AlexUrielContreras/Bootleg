const user = require('./user');
const posts = require('./posts');
const comment=require("./comment");

//const likes=require("../[DEPRECATED WORK]/likes")
user.hasMany(posts, {
  foreignKey: 'user_id',
});
posts.belongsTo(user, {
  foreignKey: 'user_id',
});
posts.hasMany(comment,{
  foreignKey:"post_id"
})
comment.belongsTo(posts,{
  foreignKey:"post_id"
})
user.hasMany(comment,{
  foreignKey:"user_id"
})
comment.belongsTo(user,{
  foreignKey:"user_id"
})
/*
likes.belongsTo(comment,{
  foreignKey:"comment_id"
})
comment.hasOne(likes,{
  foreignKey:"comment_id"
})
likes.belongsTo(posts,{
  foreignKey:"post_id"
})
*/


module.exports = { user, posts,comment};
