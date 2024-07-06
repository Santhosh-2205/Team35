# Conference Registration Management System

## Overview

This repository contains all the resources and documentation for the Conference Registration Management System project. Our goal is to streamline the process of creating registration systems for conferences, reducing redundant efforts across the industry by providing a customizable, no-code GUI platform. This platform supports multiple input types and logical dependencies between fields, making it easier for conference organizers to adapt the system to their specific need.

## Tree
```
Team35/
├── code  
│   ├── image  
│   │   ├── expand.png  
│   │   ├── export.png  
│   │   ├── image.png  
│   │   ├── mcq.png  
│   │   ├── single.png  
│   │   └── text.png
│   └── webpage  
│       ├── CSS
│       │   └── styles.css
│       ├── HTML
│       │   └── registration_page.html
│       └── JS
│           ├── darkmode.js
│           ├── enter_edit.js
│           ├── exit_edit.js
│           ├── export_handle.js
│           ├── export_html.js
│           ├── export_style.js
│           ├── MCQBox.js
│           ├── misc.js
│           ├── movement.js
│           ├── script.js
│           └── singlebox.js
├── docs  
│   ├── ClassDiagram.svg  
│   ├── Presentation.pdf  
│   ├── SRS.pdf  
│   ├── StatusTracker.xlsx  
│   ├── TestPlanTracker.xlsx  
│   └── WireFrame.pdf  
├── MoM  
│   ├── Apr12.pdf  
│   ├── Apr17.pdf  
│   ├── Apr1.pdf  
│   ├── Apr5.pdf  
│   └── Apr8.pdf  
└── README.md 
```


## Documentation

The docs folder contains all the documentation related to the project. This includes:

- SRS (Software Requirements Specification): Detailed requirements and specifications for the system.
- Test Plan: Outlines the testing strategies and test cases.
- Design: Wireframe generated using figma.
- Class Diagram: Visual representation of the system's class structure in svg format.(Open in browser for better view).
- Status Tracker: Regular updates and progress tracking of project milestones
- Presentation: Presentation of the project

## Minutes of Meetings

All minutes from meetings with client are documented and can be found in the MoM folder. The file names in the MoM directory are dated to reflect the specific meeting dates, ensuring easy identification and chronological organization of the meeting records.

## Code 
The code directory contains all the source files necessary for the functionality and aesthetics of the conference registration management system. Within the image subdirectory, various icons (e.g., expand.png, export.png) are stored, which are used throughout the user interface to enhance visual comprehension and interaction. The webpage subdirectory houses the core web files:

- template.html: This is the main HTML file used for creating and exporting registration forms. It provides the structure and elements that organizers can customize and deploy.
- example.html: This file is an example of a registration form generated using template.html, showcasing a practical implementation.
- script.js and styles.css: These files contain the JavaScript functionality and CSS styles respectively, ensuring dynamic interactions and a consistent, responsive design across the platform.

## Getting Started

To get started with this project, clone the repository and navigate to it.

```
git clone https://github.com/Santhosh-2205/Team35.git
cd Team35
```

Next navigate to template.html and open with browser.(Can be done from GUI also)

```
cd code/webpage
xdg-open template.html
```

## Guide to Creating Registration Forms

Here are concise points on how to use the conference registration form creation tool within the system:

- **Drag and Drop Interface**: On the right side of the workspace, you will find options equipped with small images representing different form elements such as single select, multi-select, and text inputs, along with non-input text for titles or instructions. You can drag any of these elements into the workspace to start building your form.

- **Interactive Editing Mode**: Double-click on any form element in the workspace to enter edit mode. In this mode, you can add or delete choices, link questions to create logical dependencies, and customize the element to suit your registration form needs.

- **Expanding Form Size**: Utilize the expand feature, also located at the top left of the workspace, to increase the size of form.

- **Exporting Your Form**: Once your form is complete, click the 'Export' button located at the top left of the interface. You will be prompted to enter a file name for your form, after which it will be saved as an HTML file that you can use for your conference.

- **Night Mode Toggle**: Enhance your user experience by toggling to night mode via the option available on the right column. This feature provides a darker interface that is easier on the eyes, especially during extended use.

## Example Form

The example.html file demonstrates a fully functional registration form generated using our builder.



