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
        .textonly-box{
             width: 440px;
          height: 60px;
          border-radius: 12px;
          resize: both;
          overflow: hidden;
          position: absolute;
          transform: translate(-50%, -50%);
          display: block;
          padding: 10px;
          border:none;
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
        .textarea-box textarea,
        .textonly-box textarea {
            width: 100%;
            height: 92%;
            border: 1px solid black;
            font-size: 16px; /* Increase font size */
            font-weight: bold; /* Make text bold */
            padding: 5px; /* Adjust padding as needed */
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
