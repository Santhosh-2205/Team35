function createMCQBox(x, y) {

    const mcqBox = document.createElement('div');
    mcqBox.classList.add('textarea-box','mcq-box');
    mcqBox.style.width = "400px"; 
    mcqBox.style.height = "auto"; 
    mcqBox.style.border = "2px solid black";
    mcqBox.style.position = "absolute";
    mcqBox.style.transform = "translate(-50%, -50%)";
    mcqBox.style.left = `${x}px`; 
    mcqBox.style.top = `${y}px`; 
    mcqBox.style.display = 'block';
    mcqBox.style.position = 'absolute'; 
    mcqBox.style.cursor = 'move';
    mcqBox.addEventListener('mousedown', handleMouseDown);
    
    const questionTextarea = document.createElement('textarea');
    questionTextarea.style.width = "100%";
    questionTextarea.style.border = "1px solid black";
    questionTextarea.placeholder = "Question";
    
    const optionsContainer = document.createElement('div');
    
    function addOption() {
        const optionInput = document.createElement('input');
        optionInput.type = "checkbox";
        optionInput.style.marginRight = "5px"; 
        const optionTextarea = document.createElement('textarea');
        optionTextarea.style.width = "80%";
        optionTextarea.style.border = "1px solid black";
        optionTextarea.placeholder = "Option";
        const deleteOptionButton = document.createElement('button');
        deleteOptionButton.textContent = "Delete";
        deleteOptionButton.addEventListener('click', function () {
            optionsContainer.removeChild(optionDiv);
        });
        
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
        optionInput.type = "checkbox"; 
        optionInput.style.marginRight = "5px"; 
        const optionTextarea = document.createElement('textarea');
        optionTextarea.style.width = "80%";
        optionTextarea.style.border = "1px solid black";
        optionTextarea.placeholder = "Option";
      
        const optionDiv = document.createElement('div');
        optionDiv.classList.add('option');
        optionDiv.appendChild(optionInput);
        optionDiv.appendChild(optionTextarea);
        optionDiv.addEventListener('click', function(event) {
            event.stopPropagation();
        });
        
        optionsContainer.appendChild(optionDiv);
    }
    
    for (let i = 0; i < 4; i++) {
        addOption_initial();
    }
    function addLinkToOption(optionDiv, mcqBox) {
        const addLinkButton = document.createElement('button');
        addLinkButton.textContent = "Add Link";
        addLinkButton.addEventListener('click', function () {
            const dropdownContainer = document.createElement('div');
            dropdownContainer.classList.add('dropdown-content');
            dropdownContainer.style.position = 'absolute';
            dropdownContainer.style.display = 'block';
            dropdownContainer.style.backgroundColor = '#f1f1f1';
            dropdownContainer.style.minWidth = '160px';
            dropdownContainer.style.boxShadow = '0px 8px 16px 0px rgba(0,0,0,0.2)';
            dropdownContainer.style.zIndex = '1';
            dropdownContainer.addEventListener('click', function (event) {
                event.stopPropagation(); 
            });
    
            mainArea.childNodes.forEach((child, index) => {
                if (child.nodeType === Node.ELEMENT_NODE) {
                    const id = 'container_' + index; 
                    const menuItem = document.createElement('a');
                    menuItem.textContent = id;
                    menuItem.href = '#';
                    menuItem.style.padding = '12px 16px';
                    menuItem.style.textDecoration = 'none';
                    menuItem.style.display = 'block';
                    child.id=id;        
                    menuItem.addEventListener('mouseenter', function () {
                        const container = document.getElementById(id);
                        console.log(id);
                        console.log(container);

                        if (container) {
                            container.style.border = '2px solid red';
                        }
                    });
    
                    menuItem.addEventListener('mouseleave', function () {
                        const container = document.getElementById(id);
                        if (container) {
                            container.style.border = ''; 
                        }
                    });
    
                    menuItem.addEventListener('click', function () {
                        const container = document.getElementById(id);
                        if (container) {
                            optionDiv.dataset.linkedContainerId = id;
                            alert("Option linked to container: " + id);
                        }
                        dropdownContainer.parentNode.removeChild(dropdownContainer); 
                    });
                    dropdownContainer.appendChild(menuItem);
                }
            });
    
            optionDiv.appendChild(dropdownContainer);
    
            
            document.addEventListener('click', function (event) {

                if (dropdownContainer) {
                    mainArea.childNodes.forEach(child => {
                        if (child.nodeType === Node.ELEMENT_NODE) {
                            child.style.border = '';
                        }
                    });
            
                    if (!dropdownContainer.contains(event.target)) {
                        dropdownContainer.parentNode.removeChild(dropdownContainer);
                    }
                }
            });
        });
    
        optionDiv.appendChild(addLinkButton);
    }
    
    function enterEditModeMCQ(event) {
        mcqBox.style.border = "1px solid blue"; 
        mcqBox.removeEventListener('dblclick', enterEditModeMCQ); 
        const existingOptions = optionsContainer.querySelectorAll('div');
        existingOptions.forEach(option => {
            const deleteOptionButton = document.createElement('button');
            deleteOptionButton.textContent = "Delete";
            deleteOptionButton.addEventListener('click', function () {
                optionsContainer.removeChild(option); 
            });
            option.appendChild(deleteOptionButton);
            addLinkToOption(option, mcqBox);
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener('click', function () {
            mcqBox.parentNode.removeChild(mcqBox); 
        });
        mcqBox.appendChild(deleteButton); 
        
        const addOptionButton = document.createElement('button');
        addOptionButton.textContent = "Add Option";
        addOptionButton.addEventListener('click', addOption);
        mcqBox.appendChild(addOptionButton);
        
        const exitEditModeButton = document.createElement('button');
        exitEditModeButton.textContent = "Exit Edit Mode";
        exitEditModeButton.addEventListener('click', exitEditModeMCQ);
        mcqBox.appendChild(exitEditModeButton); 
    }

    function exitEditModeMCQ() {
        mcqBox.contentEditable = false; 
        mcqBox.style.border = "2px solid black";
        mcqBox.addEventListener('dblclick', enterEditModeMCQ); 

        const buttons = mcqBox.querySelectorAll('button');
        buttons.forEach(button => {
            button.parentNode.removeChild(button);
        });
    }
    
    mcqBox.addEventListener('dblclick', enterEditModeMCQ);
    mcqBox.appendChild(questionTextarea);
    mcqBox.appendChild(optionsContainer);
    document.body.appendChild(mcqBox);
    mainArea.appendChild(mcqBox);
    
    return mcqBox;
}
