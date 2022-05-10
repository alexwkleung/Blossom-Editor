//credit: https://stackoverflow.com/questions/17646555/filereader-and-codemirror-load-file-complication
function loadfile(input) {
    const reader = new FileReader()
    reader.onload = function(e) {
      editor.setValue(e.target.result);
    }
    reader.readAsText(input.files[0]);
};
