function exitEditModeText(event) {
    const textbox = event.target.parentNode;
    textbox.contentEditable = false; 
    textbox.style.border = "none"; 
    textbox.removeEventListener('click', exitEditModeText); 
    const deleteButton = textbox.querySelector('.delete-button');
    if (deleteButton) {
        deleteButton.parentNode.removeChild(deleteButton); 
    }
    const exitButton = textbox.querySelector('.exit-button');
    if (exitButton) {
        exitButton.parentNode.removeChild(exitButton); 
    }
    const textbutton = textbox.querySelector('.text-button');
    if (textbutton) {
        textbutton.parentNode.removeChild(textbutton); 
    }
    const emailButton = textbox.querySelector('.email-button');
    if (emailButton) {
        emailButton.parentNode.removeChild(emailButton); 
    }
    const phoneButton = textbox.querySelector('.phone-button');
    if (phoneButton) {
        phoneButton.parentNode.removeChild(phoneButton); 
    }

}
