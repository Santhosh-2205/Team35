let dragged;
let draggedElement = null;

let num_expands=0
// Function to handle mousemove event
function expandMainArea() {
    const mainArea = document.querySelector('.main-area');
    const expandedHeight = 100; // Adjust this value to the desired height to expand by
    num_expands+=1;
    console.log(parseInt(mainArea.style.height)); 
    mainArea.style.height = `${1000 + expandedHeight*num_expands}px`;
    
}

// Create a button element
const expandButton = document.createElement('button');
expandButton.textContent = 'Expand';
expandButton.addEventListener('click', expandMainArea);

// Append the button to the end of the main area
document.addEventListener("DOMContentLoaded", function() {
    const mainArea = document.querySelector('.main-area');
    mainArea.appendChild(expandButton);
});
function calculateBoundary(element) {
    const mainArea = document.querySelector('.main-area');
    const mainAreaRect = mainArea.getBoundingClientRect();
    const elementRect = element.getBoundingClientRect();
    
    // Calculate the maximum allowable left, top, right, and bottom positions
    const maxLeft = mainAreaRect.left+ elementRect.width/2;
    const maxTop = mainAreaRect.top+ elementRect.height/2;
    const maxRight = mainAreaRect.right - elementRect.width/2;
    const maxBottom = mainAreaRect.bottom+num_expands*100 ;
    
    return { maxLeft, maxTop, maxRight, maxBottom };
}

// Function to handle mousemove event
function handleMouseMove(event) {
    if (draggedElement) {
        const boundary = calculateBoundary(draggedElement);
        const deltaX = event.clientX - draggedElement.initialX;
        const deltaY = event.clientY - draggedElement.initialY;
        
        // Calculate the new position within the boundaries
        let newLeft = draggedElement.initialLeft + deltaX;
        let newTop = draggedElement.initialTop + deltaY;
        // Ensure the element stays within the boundaries
        newLeft = Math.max(boundary.maxLeft, Math.min(newLeft, boundary.maxRight));
        newTop = Math.max(boundary.maxTop, Math.min(newTop, boundary.maxBottom));
        
        // Update the position of the dragged element
        draggedElement.style.left = `${newLeft}px`;
        draggedElement.style.top = `${newTop}px`;
    }
}

// Function to handle mousedown event on draggable element
function handleMouseDown(event) {
    draggedElement = event.target.parentElement;
    console.log(draggedElement);
    // Store initial position of the dragged element
    draggedElement.initialX = event.clientX;
    draggedElement.initialY = event.clientY;
    draggedElement.initialLeft = draggedElement.offsetLeft;
    draggedElement.initialTop = draggedElement.offsetTop;
}

// Function to handle mouseup event
function handleMouseUp() {
    draggedElement = null;
}

// Add event listeners
document.addEventListener('mousemove', handleMouseMove);
document.addEventListener('mouseup', handleMouseUp);
const icon = document.querySelector('.icon.col-4');
const icon_image = document.querySelector('.icon-image.col-4');
const inputFileBox = document.querySelector('.file-box');
const icon_mcq = document.querySelector('.icon-mcq.col-4');
const icon_single=document.querySelector('.icon-single.col-4');


const textareaBox = document.querySelector('.textarea-box');
const mainArea = document.querySelector('.main-area');

icon.addEventListener("dragstart", (event) => {
    dragged = event.target  ;
});
icon_image.addEventListener("dragstart", (event) => {
    dragged = event.target  ;
});
icon_mcq.addEventListener("dragstart", (event) => {
    dragged = event.target  ;
}); 
icon_single.addEventListener("dragstart", (event) => {
    dragged = event.target  ;
}); 
document.body.addEventListener("dragover", (event) => {
    event.preventDefault();
});

function allowDrop(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    
    if (dragged.classList.contains("icon")) {
        const clone = document.createElement('div');
        clone.classList.add("textarea-box");
        const questionTextArea = document.createElement('textarea');
        questionTextArea.style.width = "100%";
        questionTextArea.style.height = "30%";
        questionTextArea.style.border = "1px solid black";
        questionTextArea.placeholder = "Question";
        const answerTextArea = document.createElement('textarea');
        answerTextArea.style.width = "100%";
        answerTextArea.style.height = "62%";
        answerTextArea.style.border = "1px solid black";
        answerTextArea.placeholder = "Answer";
        clone.appendChild(questionTextArea);
        clone.appendChild(answerTextArea);
        const x = event.clientX;
        const y = event.clientY;
        clone.style.left = `${x - clone.offsetWidth / 2}px`;
        clone.style.top = `${y - clone.offsetHeight / 2}px`;
        clone.style.display = 'block';
        clone.style.position = 'absolute'; // Make sure the box is absolutely positioned
        clone.style.cursor = 'move';
        clone.addEventListener('dblclick', enterEditModeText);
        clone.addEventListener('exit-button', exitEditModeText);
            // Change cursor to indicate draggable element
        
        clone.addEventListener('mousedown', handleMouseDown);


        document.body.appendChild(clone);
    }
    

    if (dragged.classList.contains("icon-image")) {

        const clone = dragged.cloneNode(true);

        clone.classList.remove("icon-image");
        clone.classList.add("file-box");

        const x = event.clientX;
        const y = event.clientY;
        clone.style.left = `${x - clone.offsetWidth / 2}px`;
        clone.style.top = `${y - clone.offsetHeight / 2}px`;


        clone.innerHTML = '<input type="file" accept="image/*" class="file-input">';
        clone.style.display = 'block';

        document.body.appendChild(clone);
    }
        if (dragged.classList.contains("icon-mcq")) {
    
    const clone = createMCQBox(event.clientX, event.clientY);
    document.body.appendChild(clone);
}
if (dragged.classList.contains("icon-single")) {
    
    const clone = createSingleBox(event.clientX, event.clientY);
    document.body.appendChild(clone);
}
}
const chooseFile = document.getElementById("choose-file");
const imgPreview = document.getElementById("img-preview");
chooseFile.addEventListener("change", function () {
    getImgData();
});

function getImgData() {
    const files = chooseFile.files[0];
    if (files) {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(files);
        fileReader.addEventListener("load", function () {
            imgPreview.style.display = "block";
            imgPreview.innerHTML = '<img src="' + this.result + '" width="200px"/>';
        });
    }
}

// JavaScript for resizable textarea
const resizableTextarea = document.getElementById("resizableTextarea");
let startX, startY, startWidth, startHeight;

resizableTextarea.addEventListener('mousedown', initResize, false);

function initResize(e) {
    startX = e.clientX;
    startY = e.clientY;
    startWidth = parseInt(document.defaultView.getComputedStyle(resizableTextarea).width, 10);
    startHeight = parseInt(document.defaultView.getComputedStyle(resizableTextarea).height, 10);
    document.documentElement.addEventListener('mousemove', doResize, false);
    document.documentElement.addEventListener('mouseup', stopResize, false);
}

function doResize(e) {
    resizableTextarea.style.width = (startWidth + e.clientX - startX) + 'px';
    resizableTextarea.style.height = (startHeight + e.clientY - startY) + 'px';
}

function stopResize() {
    document.documentElement.removeEventListener('mousemove', doResize, false);
    document.documentElement.removeEventListener('mouseup', stopResize, false);
}


function createMCQBox(x, y) {
    // Create MCQ box
    const mcqBox = document.createElement('div');
    mcqBox.classList.add('textarea-box');
    mcqBox.style.width = "400px"; // Adjust the width as needed
    mcqBox.style.height = "auto"; // Height will adjust based on content
    mcqBox.style.border = "2px solid black";
    mcqBox.style.position = "absolute";
    mcqBox.style.transform = "translate(-50%, -50%)";
    mcqBox.style.left = `${x}px`; // Use the passed x coordinate
    mcqBox.style.top = `${y}px`; // Use the passed y coordinate
    mcqBox.style.display = 'block';// Make sure the box is absolutely positioned
    mcqBox.style.position = 'absolute'; // Make sure the box is absolutely positioned
    mcqBox.style.cursor = 'move';
    mcqBox.addEventListener('mousedown', handleMouseDown);
    // Create initial question field
    const questionInput = document.createElement('input');
    questionInput.type = "text";
    questionInput.style.width = "100%";
    questionInput.style.border = "1px solid black";
    questionInput.placeholder = "Question";

    // Create container to hold options
    const optionsContainer = document.createElement('div');

    // Function to add new options
    function addOption() {
        const optionInput = document.createElement('input');
        optionInput.type = "checkbox"; // Allow selection of options
        optionInput.style.marginRight = "5px"; // Add some spacing between checkbox and option text
        const optionTextInput = document.createElement('input');
        optionTextInput.type = "text";
        optionTextInput.style.width = "100%";
        optionTextInput.style.border = "1px solid black";
        optionTextInput.placeholder = "Option";
        const deleteOptionButton = document.createElement('button');
        deleteOptionButton.textContent = "Delete";
        deleteOptionButton.addEventListener('click', function () {
            optionsContainer.removeChild(optionDiv);
        });

        // Container for each option
        const optionDiv = document.createElement('div');
        optionDiv.appendChild(optionInput);
        optionDiv.appendChild(optionTextInput);
        optionDiv.appendChild(deleteOptionButton);
        optionsContainer.appendChild(optionDiv);
    }
    function addOption_initial() {
        const optionInput = document.createElement('input');
        optionInput.type = "checkbox"; // Allow selection of options
        optionInput.style.marginRight = "5px"; // Add some spacing between checkbox and option text
        const optionTextInput = document.createElement('input');
        optionTextInput.type = "text";
        optionTextInput.style.width = "100%";
        optionTextInput.style.border = "1px solid black";
        optionTextInput.placeholder = "Option";
        

        // Container for each option
        const optionDiv = document.createElement('div');
        optionDiv.appendChild(optionInput);
        optionDiv.appendChild(optionTextInput);
        optionsContainer.appendChild(optionDiv);
    }

    // Add four initial options
    for (let i = 0; i < 4; i++) {
        addOption_initial();
    }

    // Function to enter edit mode
    function enterEditModeMCQ(event) {
        mcqBox.style.border = "1px solid blue"; // Add a visual indication for edit mode
        mcqBox.removeEventListener('dblclick', enterEditModeMCQ); // Remove the event listener to prevent re-triggering
    
        // Add delete button to existing options
        const existingOptions = optionsContainer.querySelectorAll('div');
        existingOptions.forEach(option => {
            const deleteOptionButton = document.createElement('button');
            deleteOptionButton.textContent = "Delete";
            deleteOptionButton.addEventListener('click', function () {
                optionsContainer.removeChild(option); // Remove the option when delete button is clicked
            });
            option.appendChild(deleteOptionButton); // Append the delete button to the option
        });
    
        // Add buttons for delete, add option, and exit edit mode
        const deleteButton = document.createElement('button');
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener('click', function () {
            mcqBox.parentNode.removeChild(mcqBox); // Remove the MCQ box when delete button is clicked
        });
        mcqBox.appendChild(deleteButton); // Append the delete button to the MCQ box
    
        const addOptionButton = document.createElement('button');
        addOptionButton.textContent = "Add Option";
        addOptionButton.addEventListener('click', addOption);
        mcqBox.appendChild(addOptionButton); // Append the add option button to the MCQ box
    
        const exitEditModeButton = document.createElement('button');
        exitEditModeButton.textContent = "Exit Edit Mode";
        exitEditModeButton.addEventListener('click', exitEditModeMCQ);
        mcqBox.appendChild(exitEditModeButton); // Append the exit button to the MCQ box
    }
    

    // Function to exit edit mode
    function exitEditModeMCQ() {
        mcqBox.contentEditable = false; // Disable content editing
        mcqBox.style.border = "2px solid black"; // Remove the border indicating edit mode
        mcqBox.addEventListener('dblclick', enterEditModeMCQ); // Re-attach the event listener for entering edit mode
    
        // Remove all buttons
        const buttons = mcqBox.querySelectorAll('button');
        buttons.forEach(button => {
            button.parentNode.removeChild(button);
        });
    }

    // Add event listener to enter edit mode on double click
    mcqBox.addEventListener('dblclick', enterEditModeMCQ);

    // Append question input and options container to MCQ box
    mcqBox.appendChild(questionInput);
    mcqBox.appendChild(optionsContainer);

    // Append MCQ box to the document body
    document.body.appendChild(mcqBox);

    return mcqBox;
}
function exitEditModeText(event) {
    const textbox = event.target.parentNode;
    textbox.contentEditable = false; // Disable content editing
    textbox.style.border = "none"; // Remove the border indicating edit mode
    textbox.removeEventListener('click', exitEditModeText); 
    const deleteButton = textbox.querySelector('.delete-button');
    if (deleteButton) {
        deleteButton.parentNode.removeChild(deleteButton); // Remove the delete button
    }
    const exitButton = textbox.querySelector('.exit-button');
    if (exitButton) {
        exitButton.parentNode.removeChild(exitButton); // Remove the exit button
    }
    const textbutton = textbox.querySelector('.text-button');
    if (textbutton) {
        textbutton.parentNode.removeChild(textbutton); // Remove the exit button
    }
    const emailButton = textbox.querySelector('.email-button');
    if (emailButton) {
        emailButton.parentNode.removeChild(emailButton); // Remove the exit button
    }
    const phoneButton = textbox.querySelector('.phone-button');
    if (phoneButton) {
        phoneButton.parentNode.removeChild(phoneButton); // Remove the exit button
    }

}
function enterEditModeText(event) {
    const textbox = event.target;
    const isTextAreaBox = textbox.classList.contains('textarea-box');
    if (isTextAreaBox) {
        textbox.contentEditable = false; // Allow editing content
        textbox.style.border = "1px solid blue"; // Add a visual indication for edit mode
        const existingDeleteButton = textbox.querySelector('.delete-button');
        if (!existingDeleteButton) { // Check if delete button already exists
            const deleteButton = document.createElement('button');
            deleteButton.textContent = "Delete";
            deleteButton.classList.add('delete-button');
            deleteButton.addEventListener('click', function () {
                textbox.parentNode.removeChild(textbox); // Remove the textarea-box when delete button is clicked
            });
            textbox.appendChild(deleteButton); // Append the delete button to the textbox
        }
        // Find the second textarea within the textbox
        const secondTextarea = textbox.querySelector('textarea:nth-child(2)');
        
        // Add buttons for text, email, and phone number
        const textButton = document.createElement('button');
        textButton.textContent = "Text";
        textButton.classList.add('text-button');
        textButton.addEventListener('click', function () {
            secondTextarea.setAttribute('type', 'text');
            secondTextarea.placeholder = "Type your text here";
            secondTextarea.value = ''; // Clear any existing value
        });
        
        const emailButton = document.createElement('button');
        emailButton.textContent = "Email";
        emailButton.classList.add('email-button');

        emailButton.addEventListener('click', function () {
            secondTextarea.setAttribute('type', 'email');
            secondTextarea.placeholder = "Type your email here";
            secondTextarea.value = ''; // Clear any existing value
        });
        
        const phoneButton = document.createElement('button');
        phoneButton.textContent = "Phone";
        phoneButton.classList.add('phone-button');

        phoneButton.addEventListener('click', function () {
            secondTextarea.setAttribute('type', 'tel');
            secondTextarea.placeholder = "Type your phone number here";
            secondTextarea.value = ''; // Clear any existing value
        });
        
        textbox.appendChild(textButton);
        textbox.appendChild(emailButton);
        textbox.appendChild(phoneButton);
        
        // Add exit edit mode button
        const exitEditModeButton = document.createElement('button');
        exitEditModeButton.textContent = "Exit Edit Mode";
        exitEditModeButton.classList.add('exit-button');
        exitEditModeButton.addEventListener('click', exitEditModeText);
        textbox.appendChild(exitEditModeButton);
    }
}

function createSingleBox(x, y) {
    // Create single box
    const singleBox = document.createElement('div');
    singleBox.classList.add('textarea-box');
    singleBox.style.width = "400px"; // Adjust the width as needed
    singleBox.style.height = "auto"; // Height will adjust based on content
    singleBox.style.border = "2px solid black";
    singleBox.style.position = "absolute";
    singleBox.style.transform = "translate(-50%, -50%)";
    singleBox.style.left = `${x}px`; // Use the passed x coordinate
    singleBox.style.top = `${y}px`; // Use the passed y coordinate
    singleBox.style.display = 'block';
    singleBox.style.position = 'absolute'; // Make sure the box is absolutely positioned
    singleBox.style.cursor = 'move';
    mcqBox.addEventListener('mousedown', handleMouseDown);
    
    // Create delete button


    // Create initial question field
    const questionInput = document.createElement('input');
    questionInput.type = "text";
    questionInput.style.width = "100%";
    questionInput.style.border = "1px solid black";
    questionInput.placeholder = "Question";

    // Create button to add options
    const addOptionButton = document.createElement('button');
    addOptionButton.textContent = "Add Option";

    // Create container to hold options
    const optionsContainer = document.createElement('div');

    // Function to add new options
    function addOption() {
        const optionInput = document.createElement('input');
        optionInput.type = "radio"; // Only one option can be selected
        optionInput.style.marginRight = "5px"; // Add some spacing between radio button and option text
        const optionTextInput = document.createElement('input');
        optionTextInput.type = "text";
        optionTextInput.style.width = "100%";
        optionTextInput.style.border = "1px solid black";
        optionTextInput.placeholder = "Option";
        const deleteOptionButton = document.createElement('button');
        deleteOptionButton.textContent = "Delete";
        deleteOptionButton.addEventListener('click', function () {
            optionsContainer.removeChild(optionDiv);
        });

        // Container for each option
        const optionDiv = document.createElement('div');
        optionDiv.appendChild(optionInput);
        optionDiv.appendChild(optionTextInput);
        optionDiv.appendChild(deleteOptionButton);
        optionsContainer.appendChild(optionDiv);

        // Ensure only one option can be selected
        optionInput.addEventListener('click', function() {
            Array.from(optionsContainer.children).forEach(option => {
                if (option !== optionDiv) {
                    option.querySelector('input[type="radio"]').checked = false;
                }
            });
        });
    }
    function addOption_initial() {
        const optionInput = document.createElement('input');
        optionInput.type = "radio"; // Only one option can be selected
        optionInput.style.marginRight = "5px"; // Add some spacing between radio button and option text
        const optionTextInput = document.createElement('input');
        optionTextInput.type = "text";
        optionTextInput.style.width = "100%";
        optionTextInput.style.border = "1px solid black";
        optionTextInput.placeholder = "Option";
        
        // Container for each option
        const optionDiv = document.createElement('div');
        optionDiv.appendChild(optionInput);
        optionDiv.appendChild(optionTextInput);
        optionsContainer.appendChild(optionDiv);

        // Ensure only one option can be selected
        optionInput.addEventListener('click', function() {
            Array.from(optionsContainer.children).forEach(option => {
                if (option !== optionDiv) {
                    option.querySelector('input[type="radio"]').checked = false;
                }
            });
        });
    }
    for (let i = 0; i < 4; i++) {
        addOption_initial();
    }

    // Add event listener to enter edit mode on double click
    function enterEditMode(event) {
        singleBox.contentEditable = true; // Allow editing content
        singleBox.style.border = "1px solid blue"; // Add a visual indication for edit mode
        singleBox.removeEventListener('dblclick', enterEditMode); // Remove the event listener to prevent re-triggering

        // Add delete button to existing options
        const existingOptions = optionsContainer.querySelectorAll('div');
        existingOptions.forEach(option => {
            const deleteOptionButton = document.createElement('button');
            deleteOptionButton.textContent = "Delete";
            deleteOptionButton.addEventListener('click', function () {
                optionsContainer.removeChild(option); // Remove the option when delete button is clicked
            });
            option.appendChild(deleteOptionButton); // Append the delete button to the option
        });

        // Add buttons for delete, add option, and exit edit mode
        const deleteButton = document.createElement('button');
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener('click', function () {
            singleBox.parentNode.removeChild(singleBox); // Remove the single box when delete button is clicked
        });
        singleBox.appendChild(deleteButton); // Append the delete button to the single box

        const addOptionButton = document.createElement('button');
        addOptionButton.textContent = "Add Option";
        addOptionButton.addEventListener('click', addOption);
        singleBox.appendChild(addOptionButton); // Append the add option button to the single box

        const exitEditModeButton = document.createElement('button');
        exitEditModeButton.textContent = "Exit Edit Mode";
        exitEditModeButton.addEventListener('click', exitEditMode);
        singleBox.appendChild(exitEditModeButton); // Append the exit button to the single box
    }

    // Function to exit edit mode
    function exitEditMode() {
        singleBox.contentEditable = false; // Disable content editing
        singleBox.style.border = "2px solid black"; // Remove the border indicating edit mode
        singleBox.addEventListener('dblclick', enterEditMode); // Re-attach the event listener for entering edit mode

        // Remove added buttons
        const buttons = singleBox.querySelectorAll('button');
        buttons.forEach(button => {
            button.parentNode.removeChild(button);
        });

        // Remove delete buttons from existing options
        const existingOptions = optionsContainer.querySelectorAll('div');
        existingOptions.forEach(option => {
            const deleteButton = option.querySelector('button');
            if (deleteButton) {
                deleteButton.parentNode.removeChild(deleteButton);
            }
        });
    }

    // Add event listener to enter edit mode on double click
    singleBox.addEventListener('dblclick', enterEditMode);

    // Append question input, option container, and delete button to single box
    singleBox.appendChild(questionInput);
    singleBox.appendChild(optionsContainer);

    // Append single box to the document body
    document.body.appendChild(singleBox);

    return singleBox;
}
    
    