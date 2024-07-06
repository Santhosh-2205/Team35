function handleExport() {
    const expandedHeight = 100; 
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
    const filename = prompt('Enter the filename:', 'export.html');
    if (filename) {
        downloadHTML(filename, finalHTML);
    }
}