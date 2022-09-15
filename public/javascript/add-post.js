async function newFormHandler(event) {
    event.preventDefault();

    const file = event.target[1].files[0]
    const Caption=document.querySelector('input[name="caption"]').value.trim();
    const blob = file.slice(0,file.size,"image/png");

    const newFile = new File([blob], Caption, {type: "image/png"});
    const formData = new FormData()

    formData.append("caption",Caption)
    formData.append("image_input",newFile)
    
    console.log(formData);
    
    const response = await fetch(`/api/posts`, {
        method: 'POST',
        body: formData,
    });

    if (response.ok) {
        document.location.replace('/');
    } else {
        alert(response.statusText);
    }
}



document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);
