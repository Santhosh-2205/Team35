function downloadHTML(filename, text) {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/html;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
  }
function expandMainArea() {
    const mainArea = document.querySelector('.main-area');
    const expandedHeight = 100; 
    num_expands+=1;
    console.log(parseInt(mainArea.style.height)); 
    mainArea.style.height = `${1000 + expandedHeight*num_expands}px`;
    
}

function calculateBoundary(element) {
    const mainArea = document.querySelector('.col-md-8.vertical-line.main-area');
    const mainAreaRect = mainArea.getBoundingClientRect();
    const elementRect = element.getBoundingClientRect();
    const maxLeft = mainAreaRect.left- 0.78*elementRect.width;
    const maxTop = mainAreaRect.top+ elementRect.height/2;
    const maxRight = mainAreaRect.right  -1.8*elementRect.width;
    const maxBottom = mainAreaRect.bottom+num_expands*100+elementRect.height ;
    
    return { maxLeft, maxTop, maxRight, maxBottom };
}

 

function removeButtonsFromHTML(htmlString) {
    const tempElement = document.createElement('div');
    tempElement.innerHTML = htmlString;
    const buttons = tempElement.querySelectorAll('button');
    buttons.forEach(button => button.remove());
    return tempElement.innerHTML;
    }