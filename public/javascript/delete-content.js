//when someone clicks on a delete button for a reply, call to delete it. 
let deleteComment = document.querySelectorAll('.delete-comment-form');
console.log(deleteComment)

deleteComment.forEach(deleteCmt => {
  deleteCmt.addEventListener("click", deleteC)
})

async function deleteC(e) {
  e.preventDefault()
  console.log(e.path[1])

  const response = await fetch("/api/comments", {
    method: "DELETE",
    body: JSON.stringify({ id: e.path[1].id }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    alert('nice')
  } else {
    alert('Failed to make that request.');
  }
}

//when someone clicks on a delete button for a post, call to delete it. 
var deleteposts = document.querySelectorAll(".delete-post-form")
for (var x = 0; x < deleteposts.length; x++) {
  deleteposts[x].addEventListener("submit", async (event) => {
    event.preventDefault()
    const response = await fetch("/api/posts/", {
      method: "DELETE",
      body: JSON.stringify({ id: event.target.id }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to make that request.');
    }
  })
}