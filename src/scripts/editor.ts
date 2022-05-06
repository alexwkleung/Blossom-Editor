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
  editor.setSize("100%", "1440")
  //const textToWrite = editor.doc.getValue();

  //theme switching - credit: https://github.com/codemirror/CodeMirror/blob/master/demo/theme.html
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
  }