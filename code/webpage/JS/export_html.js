function generateMainAreaHTML(expandedHeight, num_expands) {
    const mainArea = document.querySelector('.col-md-8.vertical-line.main-area');
    if (!mainArea) {
        console.error('Main area element not found.');
        return ''; 
    }
    
    const clonedMainArea = mainArea.cloneNode(true);
    clonedMainArea.style.width = mainArea.offsetWidth + 'px';
    clonedMainArea.style.height = `${1000 + expandedHeight * num_expands}px`; 
    clonedMainArea.style.left = '500px';
    clonedMainArea.style.position = 'relative';
   
    
    
    const dynamicElements = clonedMainArea.querySelectorAll('.textarea-box');
    
   
    dynamicElements.forEach(element => {
        if (!element.classList.contains('mcq-box') && !element.classList.contains('single-box') && !element.classList.contains('textonly-box')) {
            const originalTextArea = element.querySelector('textarea');
            if (originalTextArea) {
                const clonedTextArea = element.querySelector('textarea');
                if (clonedTextArea) {
                    clonedTextArea.textContent = originalTextArea.value;
                    clonedTextArea.setAttribute('readonly', true); 
                } else {
                    console.error('Textarea not found in cloned main area.');
                }
            }
        } else if (element.classList.contains('mcq-box')) {
        
            const questionInput = element.querySelector('[placeholder="Question"]');
            const options = element.querySelectorAll('.textarea-box.mcq-box > div > div > textarea[placeholder="Option"]');
            console.log(questionInput);
            console.log(options);
    
            if (questionInput && options.length > 0) {
                const questionInputClone = element.querySelector('[placeholder="Question"]');
                questionInputClone.textContent = questionInput.value;
                questionInputClone.setAttribute('readonly', true);
                console.log(questionInput.value);
                console.log(questionInputClone.value);

                const optionInputsClones = element.querySelectorAll('.textarea-box.mcq-box > div > div > textarea[placeholder="Option"]');
                options.forEach((optionInput, index) => {
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
                const questionInputClone = element.querySelector('[placeholder="Question"]');
                questionInputClone.textContent = questionInput.value;
                questionInputClone.setAttribute('readonly', true    );
                console.log(questionInput.value);
                console.log(questionInputClone.value);
    
                const optionInputsClones = element.querySelectorAll('.textarea-box.single-box > div > div > textarea[placeholder="Option"]');
                options.forEach((optionInput, index) => {
             
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
                    clonedTextArea.setAttribute('readonly', true); 
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
   