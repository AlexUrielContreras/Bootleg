//when someone clicks on a delete button for a reply, call to delete it. 
var deletecomment = document.querySelectorAll(".delete-comment-form")
for (var x=0; x<deletecomment.length;x++){
    deletecomment[x].addEventListener("submit",async(event)=>{
        event.preventDefault()
        const response = await fetch("/api/comments/",{
            method:"DELETE",
            body: JSON.stringify({id:event.path[1].id}),
            headers: { 'Content-Type': 'application/json' },
            });
            if (response.ok) {
              document.location.reload();
            } else {
              alert('Failed to make that request.');
            }
    })
}
//when someone clicks on a delete button for a post, call to delete it. 
var deleteposts = document.querySelectorAll(".delete-post-form")
for (var x=0; x<deleteposts.length;x++){
    deleteposts[x].addEventListener("submit",async(event)=>{
        event.preventDefault()
        const response = await fetch("/api/posts/",{
            method:"DELETE",
            body: JSON.stringify({id:event.target.id}),
            headers: { 'Content-Type': 'application/json' },
            });
            if (response.ok) {
              document.location.replace('/');
            } else {
              alert('Failed to make that request.');
            }
    })
}