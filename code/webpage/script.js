let dragged;
let draggedElement = null;

let num_expands=0
const mainArea = document.querySelector('.col-md-8.vertical-line.main-area');
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
expandButton.classList.add('round-button', 'expand-button');
expandButton.addEventListener('click', expandMainArea);

const exportButton = document.createElement('button');
exportButton.classList.add('round-button', 'export-button');
exportButton.addEventListener('click', handleExport);

// Function to generate HTML of the main area including dynamically added elements
// Function to generate HTML of the main area excluding expand and export buttons
function generateMainAreaHTML(expandedHeight, num_expands) {
    const mainArea = document.querySelector('.col-md-8.vertical-line.main-area');
    if (!mainArea) {
        console.error('Main area element not found.');
        return ''; // Return empty string if main area element not found
    }
    
    // Clone the main area
    // Clone the main area
    const clonedMainArea = mainArea.cloneNode(true);
    clonedMainArea.style.width = mainArea.offsetWidth + 'px';
    clonedMainArea.style.height = `${1000 + expandedHeight * num_expands}px`; // Update the height based on num_expands
    clonedMainArea.style.left = '500px';
    clonedMainArea.style.position = 'relative';
    // Set width and height of the cloned main area to match the original
    
    // Select all dynamically added elements within the main area
    const dynamicElements = clonedMainArea.querySelectorAll('.textarea-box');
    
    // Iterate over each dynamic element
    dynamicElements.forEach(element => {
        // If the element contains a textarea, treat it as usual
        if (!element.classList.contains('mcq-box') && !element.classList.contains('single-box') && !element.classList.contains('textonly-box')) {
            const originalTextArea = element.querySelector('textarea');
            if (originalTextArea) {
                const clonedTextArea = element.querySelector('textarea');
                if (clonedTextArea) {
                    clonedTextArea.textContent = originalTextArea.value;
                    clonedTextArea.setAttribute('readonly', true); // Make textarea non-editable
                } else {
                    console.error('Textarea not found in cloned main area.');
                }
            }
        } else if (element.classList.contains('mcq-box')) {
            // If the element contains an input, treat it as an MCQ box
            const questionInput = element.querySelector('[placeholder="Question"]');
            const options = element.querySelectorAll('.textarea-box.mcq-box > div > div > textarea[placeholder="Option"]');
            console.log(questionInput);
            console.log(options);
    
            if (questionInput && options.length > 0) {
                // Add the question input
                const questionInputClone = element.querySelector('[placeholder="Question"]');
                questionInputClone.textContent = questionInput.value;
                questionInputClone.setAttribute('readonly', true);
                console.log(questionInput.value);
                console.log(questionInputClone.value);
    
                // Add each option
                const optionInputsClones = element.querySelectorAll('.textarea-box.mcq-box > div > div > textarea[placeholder="Option"]');
                options.forEach((optionInput, index) => {
                    // Select the corresponding cloned textarea for each option
                    const optionInputClone = optionInputsClones[index];
                    optionInputClone.textContent = optionInput.value;
                    optionInputClone.setAttribute('readonly', true);
    
                    console.log(optionInput.value);
                    console.log(optionInputClone.textContent);
                });
            } else {
                console.error('Question input or options container not found in MCQ box.');
            }
        }
        else if (element.classList.contains('single-box'))
        {
            const questionInput = element.querySelector('[placeholder="Question"]');
            const options = element.querySelectorAll('.textarea-box.single-box > div > div > textarea[placeholder="Option"]');
            console.log(questionInput);
            console.log(options);
    
            if (questionInput && options.length > 0) {
                // Add the question input
                const questionInputClone = element.querySelector('[placeholder="Question"]');
                questionInputClone.textContent = questionInput.value;
                questionInputClone.setAttribute('readonly', true    );
                console.log(questionInput.value);
                console.log(questionInputClone.value);
    
                // Add each option
                const optionInputsClones = element.querySelectorAll('.textarea-box.single-box > div > div > textarea[placeholder="Option"]');
                options.forEach((optionInput, index) => {
                    // Select the corresponding cloned textarea for each option
                    const optionInputClone = optionInputsClones[index];
                    optionInputClone.textContent = optionInput.value;
                    optionInputClone.setAttribute('readonly', true);
    
                    console.log(optionInput.value);
                    console.log(optionInputClone.textContent);
                });
            } else {
                console.error('Question input or options container not found in MCQ box.');
            }  
        }
        else if (element.classList.contains('textonly-box'))
        {
            const originalTextArea = element.querySelector('textarea');
            if (originalTextArea) {
                const clonedTextArea = element.querySelector('textarea');
                if (clonedTextArea) {
                    clonedTextArea.textContent = originalTextArea.value;
                    clonedTextArea.setAttribute('readonly', true); // Make textarea non-editable
                } else {
                    console.error('Textarea not found in cloned main area.');
                }
            }    
        }
        const linkedContainerId = element.id;
        console.log(element.id);
    if (linkedContainerId && document.querySelector(`[data-linked-container-id="${linkedContainerId}"]`)) {
        element.style.display = 'none';
    }
    });
    
    // Remove expand and export buttons from cloned main area
    
    const exportedHTML = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Exported HTML</title>
        <style>
          ${getExportStyles()}
          body {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            padding: 0;
          }
          .main-area {
            background-color: rgb(252, 253, 255);
            border: 1px solid #000000;
            width: 80%;
            max-width: 800px;
            min-height: ${1000 + expandedHeight * num_expands}px;
            padding: 20px;
            position: relative;
          }
        </style>
      </head>
      <body>
        <div class="main-area">
          ${clonedMainArea.innerHTML}
        </div>
      </body>
    </html>
    `;
    
    return exportedHTML;
    }
    
    function getExportStyles() {
        return `
            .textarea-box {
              width: 440px;
              height: 165px;
              border: 2px solid black;
              border-radius: 12px;
              resize: both;
              overflow: auto;
              position: absolute;
              transform: translate(-50%, -50%);
              display: block;
              padding: 10px;
            }
            
            .mcq-box, .single-box {
              width: 440px;
              height: auto;
              border: 2px solid black;
              border-radius: 12px;
              position: absolute;
              transform: translate(-50%, -50%);
              display: block;
              padding: 10px;
            }
            
            textarea {
              resize: vertical;
              border-radius: 5px;
              margin: 3px;
            }
            
            .option {
              margin-bottom: 10px;
            }
            
            .option input[type="checkbox"],
            .option input[type="radio"] {
              margin-right: 5px;
            }
        `;
      }


function removeButtonsFromHTML(htmlString) {
// Create a temporary element to parse the HTML string
const tempElement = document.createElement('div');
tempElement.innerHTML = htmlString;

// Remove all buttons from the temporary element
const buttons = tempElement.querySelectorAll('button');
buttons.forEach(button => button.remove());

// Return the updated HTML string
return tempElement.innerHTML;
}





// Function to trigger file download
function downloadHTML(filename, text) {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/html;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
  }
  
  // Function to handle export
  function handleExport() {
      const expandedHeight = 100; // Adjust this value to the desired height to expand by
      const mainAreaHTML = generateMainAreaHTML(expandedHeight, num_expands);
      const scriptContent = `
  document.addEventListener('DOMContentLoaded', function () {
      console.log("Hello");
      const options = document.querySelectorAll('.option');
      var flag=0;
      options.forEach(function (option) {
          option.addEventListener('click', function () {
              const linkedContainerId = option.dataset.linkedContainerId;
              const containers = document.querySelectorAll('.textarea-box');
              
              // Toggle the 'selected' class for the clicked option
              options.forEach(function (opt) {
                  if (opt.classList.contains('selected') && opt===option && option.type!=='radio')
                  flag=1;
                  opt.classList.remove('selected');
                  const linked=opt.dataset.linkedContainerId; // Remove 'selected' class from all options
                  containers.forEach(function (container) {
                      if (container.id === linked) {
                          
                              container.style.display = 'none'; // Hide container if option is unselected
                         
                      }
                  });
              });
              if(flag==0)
              option.classList.add('selected'); // Add 'selected' class to the clicked option
              flag =0;
              // Show or hide linked containers based on the selection state
              containers.forEach(function (container) {
                  if (container.id === linkedContainerId) {
                      if (option.classList.contains('selected')) {
                          container.style.display = 'block'; // Show linked container if option is selected
                      } else {
                          container.style.display = 'none'; // Hide container if option is unselected
                      }
                  }
              });
          });
      });
      const singleBoxOptions = document.querySelectorAll('.single-box input[type="radio"]');
  singleBoxOptions.forEach(function (optionInput) {
      optionInput.addEventListener('click', function() {
          // Traverse up the DOM to find the parent .single-box container
          const singleBoxContainer = optionInput.closest('.single-box');
          if (singleBoxContainer) {
              // Find the .optionsContainer class within the .single-box container
                  // Deselect other options within the same container
                  const options = singleBoxContainer.querySelectorAll('div > .option');
                  options.forEach(option => {
                      if (option !== optionInput.parentElement) {
                          option.querySelector('input[type="radio"]').checked = false;
                      }
                  });
              
          }
      });
  });
  
  });
  `;
  
  
      const fullHTML = `
          <!DOCTYPE html>
          <html>
              <head>
                  <title>Exported HTML</title>
              </head>
              <body>
                  ${mainAreaHTML}
              </body>
              <script>
                  ${scriptContent}
      `;
      
      const finalHTML=removeButtonsFromHTML(fullHTML);
      // Ask user for filename
      const filename = prompt('Enter the filename:', 'export.html');
      if (filename) {
          downloadHTML(filename, finalHTML);
      }
  }
// Append the export button to the document body



// Append the button to the end of the main area
document.addEventListener("DOMContentLoaded", function() {
    const mainArea = document.querySelector('.col-md-8.vertical-line.main-area');
    mainArea.appendChild(expandButton);
    mainArea.appendChild(exportButton);
});

function calculateBoundary(element) {
    const mainArea = document.querySelector('.col-md-8.vertical-line.main-area');
    const mainAreaRect = mainArea.getBoundingClientRect();
    const elementRect = element.getBoundingClientRect();
    
    // Calculate the maximum allowable left, top, right, and bottom positions
    const maxLeft = mainAreaRect.left- 0.78*elementRect.width;
    const maxTop = mainAreaRect.top+ elementRect.height/2;
    const maxRight = mainAreaRect.right  -1.8*elementRect.width;
    const maxBottom = mainAreaRect.bottom+num_expands*100+elementRect.height ;
    
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
const inputFileBox = document.querySelector('.file-box');
const icon_mcq = document.querySelector('.icon-mcq.col-4');
const icon_single=document.querySelector('.icon-single.col-4');



const textareaBox = document.querySelector('.textarea-box');
const icon_text=document.querySelector('.icon-text.col-4');

icon.addEventListener("dragstart", (event) => {
    dragged = event.target  ;
    event.dataTransfer.setData('text/plain', 'anything'); 
});
icon_mcq.addEventListener("dragstart", (event) => {
    dragged = event.target  ;
    event.dataTransfer.setData('text/plain', 'anything'); 
}); 
icon_single.addEventListener("dragstart", (event) => {
    dragged = event.target  ;
    event.dataTransfer.setData('text/plain', 'anything'); 
}); 
icon_text.addEventListener("dragstart", (event) => {
    dragged = event.target  ;
    event.dataTransfer.setData('text/plain', 'anything'); 
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
        mainArea.appendChild(clone);
    }
    

    if (dragged.classList.contains("icon-text")) {
        const clone = document.createElement('div');
        clone.classList.add("textarea-box", "textonly-box");
        const textArea = document.createElement('textarea');
        textArea.style.width = "100%";
        textArea.style.height = "92%"; // Adjusted height to occupy entire space
        textArea.style.border = "1px solid black";
        textArea.placeholder = "Write your text here";
            clone.appendChild(textArea);
        const x = event.clientX;
        const y = event.clientY;
        clone.style.left = `${x - clone.offsetWidth / 2}px`;
        clone.style.top = `${y - clone.offsetHeight / 2}px`;
        clone.style.display = 'block';
        clone.style.position = 'absolute'; // Make sure the box is absolutely positioned
        clone.style.cursor = 'move';
         // Change cursor to indicate draggable element
      
        clone.addEventListener('mousedown', handleMouseDown);
    
        document.body.appendChild(clone);
        mainArea.appendChild(clone);
    }
    
    
     if (dragged.classList.contains("icon-mcq")) {
    
    const clone = createMCQBox(event.clientX, event.clientY);
    
}
if (dragged.classList.contains("icon-single")) {
    
    const clone = createSingleBox(event.clientX, event.clientY);
    
}
}
const imgPreview = document.getElementById("img-preview");



// JavaScript for resizable textarea



function createMCQBox(x, y) {
    // Create MCQ box
    const mcqBox = document.createElement('div');
    mcqBox.classList.add('textarea-box','mcq-box');
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
    
    // Create initial question textarea
    const questionTextarea = document.createElement('textarea');
    questionTextarea.style.width = "100%";
    questionTextarea.style.border = "1px solid black";
    questionTextarea.placeholder = "Question";
    
    // Create container to hold options
    const optionsContainer = document.createElement('div');
    
    // Function to add new options
    function addOption() {
        const optionInput = document.createElement('input');
        optionInput.type = "checkbox"; // Allow selection of options
        optionInput.style.marginRight = "5px"; // Add some spacing between checkbox and option text
        const optionTextarea = document.createElement('textarea');
        optionTextarea.style.width = "80%";
        optionTextarea.style.border = "1px solid black";
        optionTextarea.placeholder = "Option";
        const deleteOptionButton = document.createElement('button');
        deleteOptionButton.textContent = "Delete";
        deleteOptionButton.addEventListener('click', function () {
            optionsContainer.removeChild(optionDiv);
        });
        
        // Container for each option
        const optionDiv = document.createElement('div');
        optionDiv.classList.add('option');
        optionDiv.appendChild(optionInput);
        optionDiv.appendChild(optionTextarea);
        optionDiv.appendChild(deleteOptionButton);
        optionDiv.addEventListener('click', function(event) {
            event.stopPropagation();
        });
        
        optionsContainer.appendChild(optionDiv);
    }
    function addOption_initial() {
        const optionInput = document.createElement('input');
        optionInput.type = "checkbox"; // Allow selection of options
        optionInput.style.marginRight = "5px"; // Add some spacing between checkbox and option text
        const optionTextarea = document.createElement('textarea');
        optionTextarea.style.width = "80%";
        optionTextarea.style.border = "1px solid black";
        optionTextarea.placeholder = "Option";
      
        // Container for each option
        const optionDiv = document.createElement('div');
        optionDiv.classList.add('option');
        optionDiv.appendChild(optionInput);
        optionDiv.appendChild(optionTextarea);
        optionDiv.addEventListener('click', function(event) {
            event.stopPropagation();
        });
        
        optionsContainer.appendChild(optionDiv);
    }
    
    // Add four initial options
    for (let i = 0; i < 4; i++) {
        addOption_initial();
    }
    function addLinkToOption(optionDiv, mcqBox) {
        const addLinkButton = document.createElement('button');
        addLinkButton.textContent = "Add Link";
        addLinkButton.addEventListener('click', function () {
            // Create a container for the dropdown menu
            const dropdownContainer = document.createElement('div');
            dropdownContainer.classList.add('dropdown-content');
            dropdownContainer.style.position = 'absolute';
            dropdownContainer.style.display = 'block';
            dropdownContainer.style.backgroundColor = '#f1f1f1';
            dropdownContainer.style.minWidth = '160px';
            dropdownContainer.style.boxShadow = '0px 8px 16px 0px rgba(0,0,0,0.2)';
            dropdownContainer.style.zIndex = '1';
            dropdownContainer.addEventListener('click', function (event) {
                event.stopPropagation(); // Prevent click events from bubbling up
            });
    
            // Loop through mainArea children and create menu items
            mainArea.childNodes.forEach((child, index) => {
                if (child.nodeType === Node.ELEMENT_NODE) {
                    const id = 'container_' + index; // Generate a unique id
                    const menuItem = document.createElement('a');
                    menuItem.textContent = id;
                    menuItem.href = '#';
                    menuItem.style.padding = '12px 16px';
                    menuItem.style.textDecoration = 'none';
                    menuItem.style.display = 'block';
                    child.id=id;        
    
                    // Highlight the corresponding container when menu item is hovered
                    menuItem.addEventListener('mouseenter', function () {
                        const container = document.getElementById(id);
                        console.log(id);
                        console.log(container);

                        if (container) {
                            container.style.border = '2px solid red'; // Change the border color as desired
                        }
                    });
    
                    // Remove the highlight when mouse leaves the menu item
                    menuItem.addEventListener('mouseleave', function () {
                        const container = document.getElementById(id);
                        if (container) {
                            container.style.border = ''; // Remove border style
                        }
                    });
    
                    // Link the option to the corresponding container
                    menuItem.addEventListener('click', function () {
                        const container = document.getElementById(id);
                        if (container) {
                            // Set data attribute to the option for linking
                            optionDiv.dataset.linkedContainerId = id;
                            alert("Option linked to container: " + id);
                        }
                        dropdownContainer.parentNode.removeChild(dropdownContainer); // Remove the dropdown menu
                    });
                    dropdownContainer.appendChild(menuItem);
                }
            });
    
            // Append the dropdown menu to the option div
            optionDiv.appendChild(dropdownContainer);
    
            // Remove the dropdown menu when clicking outside of it
            document.addEventListener('click', function (event) {
                // Check if the dropdown container exists
                if (dropdownContainer) {
                    // Remove the red border from all containers
                    mainArea.childNodes.forEach(child => {
                        if (child.nodeType === Node.ELEMENT_NODE) {
                            child.style.border = '';
                        }
                    });
            
                    // Check if the clicked element is outside the dropdown container
                    if (!dropdownContainer.contains(event.target)) {
                        dropdownContainer.parentNode.removeChild(dropdownContainer);
                    }
                }
            });
        });
    
        optionDiv.appendChild(addLinkButton);
    }
    
    
    
    
    // Function to check if the positions of two elements match
   
    
    
    
    
    
    
    
    
    
    
    
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
            addLinkToOption(option, mcqBox);
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
    
    // Append question textarea and options container to MCQ box
    mcqBox.appendChild(questionTextarea);
    mcqBox.appendChild(optionsContainer);
    
    // Append MCQ box to the document body
    document.body.appendChild(mcqBox);
    mainArea.appendChild(mcqBox);
    
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
    singleBox.classList.add('textarea-box','single-box');
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
    singleBox.addEventListener('mousedown', handleMouseDown);
    
    // Create delete button
    // Create initial question field
    const questionTextarea = document.createElement('textarea');
    questionTextarea.style.width = "100%";
    questionTextarea.style.border = "1px solid black";
    questionTextarea.placeholder = "Question";
    
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
        const optionTextarea = document.createElement('textarea');
        optionTextarea.style.width = "80%";
        optionTextarea.style.border = "1px solid black";
        optionTextarea.placeholder = "Option";
        const deleteOptionButton = document.createElement('button');
        deleteOptionButton.textContent = "Delete";
        deleteOptionButton.addEventListener('click', function () {
            optionsContainer.removeChild(optionDiv);
        });
    
        // Container for each option
        const optionDiv = document.createElement('div');
        optionDiv.classList.add('option');
        optionDiv.appendChild(optionInput);
        optionDiv.appendChild(optionTextarea);
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
        const optionTextarea = document.createElement('textarea');
        optionTextarea.style.width = "80%";
        optionTextarea.style.border = "1px solid black";
        optionTextarea.placeholder = "Option";
        
        // Container for each option
        const optionDiv = document.createElement('div');
        optionDiv.classList.add('option');

        optionDiv.appendChild(optionInput);
        optionDiv.appendChild(optionTextarea);
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
    function addLinkToOption(optionDiv, singleBox) {
        const addLinkButton = document.createElement('button');
        addLinkButton.textContent = "Add Link";
        addLinkButton.disabled = false;
        addLinkButton.addEventListener('click', function () {
            // Create a container for the dropdown menu
            event.stopPropagation(); 
            event.preventDefault(); 
            const dropdownContainer = document.createElement('div');
            dropdownContainer.classList.add('dropdown-content');
            dropdownContainer.style.position = 'absolute';
            dropdownContainer.style.display = 'block';
            dropdownContainer.style.backgroundColor = '#f1f1f1';
            dropdownContainer.style.minWidth = '160px';
            dropdownContainer.style.boxShadow = '0px 8px 16px 0px rgba(0,0,0,0.2)';
            dropdownContainer.style.zIndex = '1';
            dropdownContainer.addEventListener('click', function (event) {
                event.stopPropagation(); // Prevent click events from bubbling up
            });
    
            // Loop through mainArea children and create menu items
            mainArea.childNodes.forEach((child, index) => {
                if (child.nodeType === Node.ELEMENT_NODE) {
                    const id = 'container_' + index; // Generate a unique id
                    const menuItem = document.createElement('a');
                    menuItem.textContent = id;
                    menuItem.href = '#';
                    menuItem.style.padding = '12px 16px';
                    menuItem.style.textDecoration = 'none';
                    menuItem.style.display = 'block';
                    child.id=id;        
    
                    // Highlight the corresponding container when menu item is hovered
                    menuItem.addEventListener('mouseenter', function () {
                        const container = document.getElementById(id);
                        console.log(id);
                        console.log(container);

                        if (container) {
                            container.style.border = '2px solid red'; // Change the border color as desired
                        }
                    });
    
                    // Remove the highlight when mouse leaves the menu item
                    menuItem.addEventListener('mouseleave', function () {
                        const container = document.getElementById(id);
                        if (container) {
                            container.style.border = ''; // Remove border style
                        }
                    });
    
                    // Link the option to the corresponding container
                    menuItem.addEventListener('click', function () {
                        const container = document.getElementById(id);
                        if (container) {
                            // Set data attribute to the option for linking
                            optionDiv.dataset.linkedContainerId = id;
                            alert("Option linked to container: " + id);
                        }
                        dropdownContainer.parentNode.removeChild(dropdownContainer); // Remove the dropdown menu
                    });
                    dropdownContainer.appendChild(menuItem);
                }
            });
    
            // Append the dropdown menu to the option div
            optionDiv.appendChild(dropdownContainer);
    
            // Remove the dropdown menu when clicking outside of it
            document.addEventListener('click', function (event) {
                // Check if the dropdown container exists
                if (dropdownContainer) {
                    // Remove the red border from all containers
                    mainArea.childNodes.forEach(child => {
                        if (child.nodeType === Node.ELEMENT_NODE) {
                            child.style.border = '';
                        }
                    });
            
                    // Check if the clicked element is outside the dropdown container
                    if (!dropdownContainer.contains(event.target)) {
                        dropdownContainer.parentNode.removeChild(dropdownContainer);
                    }
                }
            });
        });
    
        optionDiv.appendChild(addLinkButton);
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
            option.appendChild(deleteOptionButton);
            addLinkToOption(option, singleBox); // Append the delete button to the option
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
    
    // Append question textarea, option container, and delete button to single box
    singleBox.appendChild(questionTextarea);
    singleBox.appendChild(optionsContainer);
    
    // Append single box to the document body
    document.body.appendChild(singleBox);
    mainArea.appendChild(singleBox);
    
    return singleBox;
}
document.addEventListener('DOMContentLoaded', function() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    const icons = document.querySelectorAll('.icon, .icon-mcq, .icon-text, .icon-single');
  
    darkModeToggle.addEventListener('change', function() {
      if (this.checked) {
        enableDarkMode();
      } else {
        disableDarkMode();
      }
    });
  
    function enableDarkMode() {
      body.classList.add('dark-mode');
      body.style.backgroundColor = '#222';
      body.style.color = '#fff';
      invertIconBackgroundColors(icons, true);
    }
  
    function disableDarkMode() {
      body.classList.remove('dark-mode');
      body.style.backgroundColor = '#fff';
      body.style.color = '#000';
      invertIconBackgroundColors(icons, false);
    }
  
    function invertIconBackgroundColors(icons, invert) {
      icons.forEach(function(icon) {
        if (invert) {
          icon.style.filter = 'invert(1)';
        } else {
          icon.style.filter = 'none';
        }
      });
    }
  });