let dragged;
let draggedElement = null;

let num_expands=0
const mainArea = document.querySelector('.col-md-8.vertical-line.main-area');

const expandButton = document.createElement('button');
expandButton.classList.add('round-button', 'expand-button');
expandButton.addEventListener('click', expandMainArea);

const exportButton = document.createElement('button');
exportButton.classList.add('round-button', 'export-button');
exportButton.addEventListener('click', handleExport);

document.addEventListener("DOMContentLoaded", function() {
    const mainArea = document.querySelector('.col-md-8.vertical-line.main-area');
    mainArea.appendChild(expandButton);
    mainArea.appendChild(exportButton);
});

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
        clone.style.position = 'absolute'; 
        clone.style.cursor = 'move';
        clone.addEventListener('dblclick', enterEditModeText);
        clone.addEventListener('exit-button', exitEditModeText);
        
      
        clone.addEventListener('mousedown', handleMouseDown);


        document.body.appendChild(clone);
        mainArea.appendChild(clone);
    }
    

    if (dragged.classList.contains("icon-text")) {
        const clone = document.createElement('div');
        clone.classList.add("textarea-box", "textonly-box");
        const textArea = document.createElement('textarea');
        textArea.style.width = "100%";
        textArea.style.height = "92%"; 
        textArea.style.border = "1px solid black";
        textArea.placeholder = "Write your text here";
            clone.appendChild(textArea);
        const x = event.clientX;
        const y = event.clientY;
        clone.style.left = `${x - clone.offsetWidth / 2}px`;
        clone.style.top = `${y - clone.offsetHeight / 2}px`;
        clone.style.display = 'block';
        clone.style.position = 'absolute'; 
        clone.style.cursor = 'move';
         
      
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


document.addEventListener('DOMContentLoaded', function() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    const icons = document.querySelectorAll('.icon, .icon-mcq, .icon-text, .icon-single');
  
    darkModeToggle.addEventListener('change', function() {
      if (this.checked) {
        enableDarkMode(body,icons);
      } else {
        disableDarkMode(body,icons);
      }
    }); 
  });