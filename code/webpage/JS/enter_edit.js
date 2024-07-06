function enterEditModeText(event) {
    const textbox = event.target;
    const isTextAreaBox = textbox.classList.contains('textarea-box');
    if (isTextAreaBox) {
        textbox.contentEditable = false; 
        textbox.style.border = "1px solid blue"; 
        const existingDeleteButton = textbox.querySelector('.delete-button');
        if (!existingDeleteButton) { 
            const deleteButton = document.createElement('button');
            deleteButton.textContent = "Delete";
            deleteButton.classList.add('delete-button');
            deleteButton.addEventListener('click', function () {
                textbox.parentNode.removeChild(textbox); 
            });
            textbox.appendChild(deleteButton); 
        }
        const secondTextarea = textbox.querySelector('textarea:nth-child(2)');
        
        const textButton = document.createElement('button');
        textButton.textContent = "Text";
        textButton.classList.add('text-button');
        textButton.addEventListener('click', function () {
            secondTextarea.setAttribute('type', 'text');
            secondTextarea.placeholder = "Type your text here";
            secondTextarea.value = ''; 
        });
        
        const emailButton = document.createElement('button');
        emailButton.textContent = "Email";
        emailButton.classList.add('email-button');

        emailButton.addEventListener('click', function () {
            secondTextarea.setAttribute('type', 'email');
            secondTextarea.placeholder = "Type your email here";
            secondTextarea.value = ''; 
        });
        
        const phoneButton = document.createElement('button');
        phoneButton.textContent = "Phone";
        phoneButton.classList.add('phone-button');

        phoneButton.addEventListener('click', function () {
            secondTextarea.setAttribute('type', 'tel');
            secondTextarea.placeholder = "Type your phone number here";
            secondTextarea.value = ''; 
        });
        
        textbox.appendChild(textButton);
        textbox.appendChild(emailButton);
        textbox.appendChild(phoneButton);
        
        const exitEditModeButton = document.createElement('button');
        exitEditModeButton.textContent = "Exit Edit Mode";
        exitEditModeButton.classList.add('exit-button');
        exitEditModeButton.addEventListener('click', exitEditModeText);
        textbox.appendChild(exitEditModeButton);
    }
}
