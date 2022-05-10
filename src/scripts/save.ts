//credit: https://stackoverflow.com/questions/51315044/how-do-i-save-the-content-of-the-editor-not-the-whole-html-page
function save() {
    const write = editor.getValue();
    const blob = new Blob([write], {
    type: "text/plain; charset=utf-8"
  });

  const defaultSaveName = "blossom.txt";
  const downloadLink = document.createElement("a");

  downloadLink.download = defaultSaveName;
  downloadLink.innerHTML = "Save File";

  if(window.webkitURL !== null) {
    //"Chrome allows the link to be clicked without adding it to the DOM."
    downloadLink.href = window.webkitURL.createObjectURL(blob);
    }
    downloadLink.click();
};