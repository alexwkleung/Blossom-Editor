//credit: https://github.com/77Z/electron-local-terminal-prototype (by 77Z)
const ipc = require('electron').ipcRenderer;

const term = new Terminal();

term.open(document.getElementById('terminal'));

ipc.on("terminal.incoming", (event, data) => {
    term.write(data);
});

term.onData(e => {
    ipc.send("terminal.keystroke", e);
});