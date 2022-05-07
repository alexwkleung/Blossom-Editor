import { app, BrowserWindow, ipcMain, Menu, MenuItemConstructorOptions, dialog } from 'electron'

import electronLocalshortcut from 'electron-localshortcut';

const pty = require('node-pty');

import os from 'os';

//import { globalShortcut } from 'electron';

//import * as path from 'path';

const createWindow = () => {
    //create new browser window with specific width + height dimensions
    const mainWindow = new BrowserWindow({
        width: 1650, //prev: 1440
        height: 770,
        resizable: true,
        fullscreenable: true,
        tabbingIdentifier: 'new tab', 
        show: false,
        //frame: false,
        webPreferences: { 
            nodeIntegration: true,
            contextIsolation: false,
            //preload: path.join(__dirname, 'build/preload.js'),
        }
    })
    //load index.html to app window
    mainWindow.loadFile('editor.html')

    mainWindow.webContents.setWindowOpenHandler(({ url }) => {
          return {
            action: 'allow',
            overrideBrowserWindowOptions: {
                y: 500,
                x: 800,
                resizable: true,
                fullscreenable: true,
                tabbingIdentifier: 'new tab', 
                show: false,
                //frame: false,
            },
            webPreferences: { 
              nodeIntegration: true,
              contextIsolation: false,
                //preload: path.join(__dirname, 'build/preload.js')
            }
          }
      })

      //menu bar fix for typescript
      //credit: https://stackoverflow.com/questions/45811603/create-electron-menu-in-typescript (by jkmartindale)
      const mac = process.platform === 'darwin'

      const menu = Menu.buildFromTemplate(
        [
          //app menu
          ...(mac ? [{
            label: app.name,
            submenu: [
              { role: 'about' },
              { type: 'separator' },
              { role: 'hide' },
              { role: 'hideothers' },
              { role: 'unhide' },
              { type: 'separator' },
              { role: 'quit' }
            ]
          }] : []) as MenuItemConstructorOptions[],
          //file menu
          {
            label: 'File',
            submenu: [
              mac ? { role: 'close' } : { role: 'quit' }
            ] as MenuItemConstructorOptions[]
          },
          //edit menu
          {
            label: 'Edit',
            submenu: [
              { role: 'undo' },
              { role: 'redo' },
              { type: 'separator' },
              { role: 'cut' },
              { role: 'copy' },
              { role: 'paste' },
              ...(mac ? [
                { role: 'pasteAndMatchStyle' },
                { role: 'delete' },
                { role: 'selectAll' },
                { type: 'separator' },
              ] : [
                { role: 'delete' },
                { type: 'separator' },
                { role: 'selectAll' }
              ]) as MenuItemConstructorOptions[]
            ]
          },
          //view menu
          {
            label: 'View',
            submenu: [
                { 
                    role: 'toggleTabBar', 
                    accelerator: 'Command+Shift+T' 
                },
                { 
                    role: 'toggleDevTools', 
                    accelerator: 'Command+Shift+D'
                },
                { label: 'Select Next Tab', role: 'selectNextTab', accelerator: 'Control+Tab'  },
                { label: 'Select Previous Tab', role: 'selectPreviousTab', accelerator: 'Control+Shift+Tab' },
                { label: 'Toggle Fullscreen', role: 'togglefullscreen', accelerator: 'Command+Shift+F' },
            ]
          }
        ]
      );

      Menu.setApplicationMenu(menu)

      //open new window shortcut
      electronLocalshortcut.register("Command+T", () => {
        createWindow();
      })

      //when render process is ready
      mainWindow.webContents.on('did-finish-load', mainWindowReady);

      function mainWindowReady() {
        console.log('Renderer Process Ready');
      }

      //show window after render process is ready
      mainWindow.once('ready-to-show', () => {
        mainWindow.show()
      }) 

      //ipc - pty process terminal
      //credit: https://github.com/77Z/electron-local-terminal-prototype (by 77Z)
      const shell = os.platform() === 'darwin' ? "bash" : "bash"

      const ptyProcess = pty.spawn(shell, [], {
        name: "xterm-color",
        cols: 80,
        rows: 24,
        cwd: process.env.HOME,
        //env: process.env
    });

    ptyProcess.on('data', function(data: any) {
        mainWindow.webContents.send("terminal.incoming", data);
        //console.log("Terminal Incoming Data Sent");
    });

    ipcMain.on("terminal.keystroke", (event, key) => {
        ptyProcess.write(key);
    });

    //mainWindow.hide() fixes the error "... Uncaught Exception: TypeError: Object has been destroyed ...".
    //the terminals are synced across tabs and are not separate processes. 
    //thus, closing a tab will destroy the correlated terminal object and cause the app to break.
    //not sure if this fix works for all Mac users using the app. however, it currently works the way i imagined it to be.
    //credit: https://stackoverflow.com/questions/41503873/cannot-prevent-window-close-in-electron (by Sudheer Gupta)

    //use synchronous message box to wait for user to select an option before yes/no operations
    //credit: https://stackoverflow.com/questions/69233432/electron-app-close-dialog-with-message-box-confirmation
    mainWindow.on('close', (e) => {
      let response = dialog.showMessageBoxSync(mainWindow, {
          type: 'question',
          buttons: ['Yes', 'No'],
          title: 'Confirm',
          message: 'Are you sure you want to close the window?'
      });
      if(response == 1) {
        e.preventDefault(); 
      } else {
        e.preventDefault();
        mainWindow.hide();
      }
  });
};

//method is called when electron is finished initialization and is ready to create browser windows
app.whenReady().then(() => {
    createWindow();

    //MacOS: re-create window when dock icon is clicked and no other windows are open 
    app.on('activate', () => {
        if(BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    })
    
    //quit app when window is closed (windows + linux) except on MacOS
    app.on('window-all-closed', () => {
        if(process.platform !== 'darwin') {
            app.quit();
        }
    });

    //disable refresh shortcut (command + r or control + r)
    app.on('browser-window-focus', function() {
        electronLocalshortcut.register("CommandOrControl+R", () => {
            console.log("CommandOrControl+R: Reload Disabled");
        })
    });

    //creates a new tab upon clicking the new tab button. depends on tabbingIdentifier for native macOS tab bar (safari-like)
    app.on('new-window-for-tab', function() {
        createWindow();
    })
});