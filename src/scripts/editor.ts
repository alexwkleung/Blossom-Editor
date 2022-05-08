const editor = CodeMirror.fromTextArea(document.getElementById("editor"), {
    lineNumbers: true,
    mode: "text/plain",
    theme: 'duotone-dark',
    smartIndent: false,
    autoRefresh: true,
    scrollbarStyle: null,
    autoCloseTags: true,
    //lineWrapping: true,
  });
  editor.setSize("100%", "2280")
  //const textToWrite = editor.doc.getValue();

  //theme switching
  //credit: https://github.com/codemirror/CodeMirror/blob/master/demo/theme.html
  const input = document.getElementById("select");
  function selectTheme() {
    const theme = input.options[input.selectedIndex].textContent;
    editor.setOption("theme", theme);
    location.hash = "#" + theme;
  }

  const choice = (location.hash && location.hash.slice(1)) || (document.location.search && decodeURIComponent(document.location.search.slice(1)));
  
  if(choice) {
    input.value = choice;
    editor.setOption("theme", choice);
  }

  CodeMirror.on(window, "hashchange", function() {
    const theme = location.hash.slice(1);
    if(theme) { 
      input.value = theme; 
      selectTheme(); 
    }
  });

  //mode switching
  const modeInput = document.getElementById("mode");
  function selectMode() {
    const mode = modeInput.options[modeInput.selectedIndex].textContent;
    editor.setOption("mode", mode);

  //add preview delay
  let delay = 0;

  editor.on("change", () => {
     clearTimeout(delay);
     delay = setTimeout(previewUpdate, 200);
  });
}

//preview html + markdown 
function previewUpdate() {
   const previewFrame = document.getElementById('preview');
   const preview =  previewFrame.contentDocument ||  previewFrame.contentWindow.document;

   //parse markdown to html
    const parse = marked.parse(editor.getValue());

    //write parsed markdown to iframe preview
    preview.open();
    preview.write(parse);
    preview.close();
  }
  setTimeout(previewUpdate, 200);