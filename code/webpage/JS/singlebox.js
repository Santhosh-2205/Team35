function createSingleBox(x, y) {
    const singleBox = document.createElement('div');
    singleBox.classList.add('textarea-box','single-box');
    singleBox.style.width = "400px"; 
    singleBox.style.height = "auto"; 
    singleBox.style.border = "2px solid black";
    singleBox.style.position = "absolute";
    singleBox.style.transform = "translate(-50%, -50%)";
    singleBox.style.left = `${x}px`;  
    singleBox.style.top = `${y}px`;
    singleBox.style.display = 'block';
    singleBox.style.position = 'absolute'; 
    singleBox.style.cursor = 'move';
    singleBox.addEventListener('mousedown', handleMouseDown);

    const questionTextarea = document.createElement('textarea');
    questionTextarea.style.width = "100%";
    questionTextarea.style.border = "1px solid black";
    questionTextarea.placeholder = "Question";

    const addOptionButton = document.createElement('button');
    addOptionButton.textContent = "Add Option";

    const optionsContainer = document.createElement('div');

    function addOption() {
        const optionInput = document.createElement('input');
        optionInput.type = "radio"; 
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
        optionsContainer.appendChild(optionDiv);

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
        optionInput.type = "radio"; 
        optionInput.style.marginRight = "5px"; 
        const optionTextarea = document.createElement('textarea');
        optionTextarea.style.width = "80%";
        optionTextarea.style.border = "1px solid black";
        optionTextarea.placeholder = "Option";

        const optionDiv = document.createElement('div');
        optionDiv.classList.add('option');

        optionDiv.appendChild(optionInput);
        optionDiv.appendChild(optionTextarea);
        optionsContainer.appendChild(optionDiv);

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

    function enterEditMode(event) {
        singleBox.contentEditable = true; 
        singleBox.style.border = "1px solid blue"; 
        singleBox.removeEventListener('dblclick', enterEditMode); 
        const existingOptions = optionsContainer.querySelectorAll('div');
        existingOptions.forEach(option => {
            const deleteOptionButton = document.createElement('button');
            deleteOptionButton.textContent = "Delete";
            deleteOptionButton.addEventListener('click', function () {
                optionsContainer.removeChild(option); 
            });
            option.appendChild(deleteOptionButton);
            addLinkToOption(option, singleBox);
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener('click', function () {
            singleBox.parentNode.removeChild(singleBox);
        });
        singleBox.appendChild(deleteButton); 
    
        const addOptionButton = document.createElement('button');
        addOptionButton.textContent = "Add Option";
        addOptionButton.addEventListener('click', addOption);
        singleBox.appendChild(addOptionButton); 
        const exitEditModeButton = document.createElement('button');
        exitEditModeButton.textContent = "Exit Edit Mode";
        exitEditModeButton.addEventListener('click', exitEditMode);
        singleBox.appendChild(exitEditModeButton); 
    }

    function exitEditMode() {
        singleBox.contentEditable = false; 
        singleBox.style.border = "2px solid black"; 
        singleBox.addEventListener('dblclick', enterEditMode); 
        const buttons = singleBox.querySelectorAll('button');
        buttons.forEach(button => {
            button.parentNode.removeChild(button);
        });
        const existingOptions = optionsContainer.querySelectorAll('div');
        existingOptions.forEach(option => {
            const deleteButton = option.querySelector('button');
            if (deleteButton) {
                deleteButton.parentNode.removeChild(deleteButton);
            }
        });
    }

    singleBox.addEventListener('dblclick', enterEditMode);
    singleBox.appendChild(questionTextarea);
    singleBox.appendChild(optionsContainer);
    document.body.appendChild(singleBox);
    mainArea.appendChild(singleBox);
    
    return singleBox;
}