const allForms = document.querySelectorAll(".toggle-comment-textarea")

allForms.forEach(updatedComment => {
    updatedComment.addEventListener('click', toggleCommentTextarea)
})


let OldEvent = null
async function UndoCommentTextArea(event) {
    console.log(event);

    var Div = event.path[1]
    var oldform = Div.children[3]
    var NewDiv = document.createElement("div")

    NewDiv.innerHTML = Div.dataset.originalmessage
    console.log(oldform)

    oldform.replaceWith(NewDiv)

    event.target.innerHTML = "Edit"
    Div.dataset.debouncer = "false"

    OldEvent = null
}

async function toggleCommentTextarea(event) {
    event.preventDefault();
    console.log(event)
    //check to make sure the comment isnt already modified
    if (event.path[1].dataset.debouncer == false) {
        event.path[1].dataset.debouncer = "true"
        //save og message to the div it belongs to, incase they change their mind
        if (!event.path[1].dataset.originalmessage) {
            event.path[1].dataset.originalmessage = event.path[1].children[3].innerHTML
        }
        if (OldEvent) {
            UndoCommentTextArea(OldEvent)
        }
        //save event globally to reverse changes if they change their mind
        OldEvent = event

        console.log("button pushed");
        console.log(event);

        var comment_detail = event.path[1].children[3]

        console.log(comment_detail);

        var EditCommentForm = document.createElement("form")
        var CommentTextArea = document.createElement("input")

        CommentTextArea.type = "textarea"
        CommentTextArea.value = event.path[1].children[3].innerHTML

        var CommentSubmitButton = document.createElement("input")

        CommentSubmitButton.type = "submit"

        EditCommentForm.appendChild(CommentTextArea)
        EditCommentForm.appendChild(CommentSubmitButton)
        EditCommentForm.dataset.comment_id = event.path[1].id
        EditCommentForm.addEventListener("submit", PostCommentEdit)

        event.target.innerHTML = "Cancel"
        event.path[1].children[3].replaceWith(EditCommentForm)

        CommentTextArea.focus()
        CommentTextArea.select()
    } else {
        UndoCommentTextArea(event)
    }
}
async function PostCommentEdit(event) {
    event.preventDefault();

    console.log(event.path[1].id);
    console.log(event.target[0].value);

    const response = await fetch("/api/comment/edit", {
        method: "POST",
        body: JSON.stringify({
            id: event.path[1].id,
            message: event.target[0].value
        }),
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.reload();
    } else {
        alert('Failed to make that request.');
    }
}
