import { app, BrowserWindow, ipcMain, Menu, MenuItemConstructorOptions, dialog } from 'electron'

import electronLocalshortcut from 'electron-localshortcut';

import * as pty from 'node-pty'

import os from 'os';

import execSh from 'exec-sh';

import process from 'process';

//import * as path from 'path';

const createWindow = (): void => {
    //create new browser window with specific width + height dimensions
    const mainWindow = new BrowserWindow({
        width: 1650, //prev: 1440
        height: 770,
        resizable: true,
        fullscreenable: true,
        tabbingIdentifier: 'new tab', 
        show: false,
        webPreferences: {
            nodeIntegration: true, //this should be disabled but the terminal won't work without it (renderer process)
            contextIsolation: false,
            //preload: path.join(__dirname, 'build/preload.js'),
        }
    });
    
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
            },
            webPreferences: {
              nodeIntegration: true,
              contextIsolation: false,
                //preload: path.join(__dirname, 'build/preload.js')
            }
          }
      });

      //menu bar fix for typescript - credit: https://stackoverflow.com/questions/45811603/create-electron-menu-in-typescript (by jkmartindale)
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
        console.log('Renderer process ready');
      }

      //show window after render process is ready
      mainWindow.once('ready-to-show', () => {
        mainWindow.show()
      }) 

      //ipc - pty process terminal
      const shell = os.platform() === 'darwin' ? "bash" : "bash"

      //fix for process.env
      //credit: https://stackoverflow.com/questions/72133247/whats-the-proper-way-to-fix-this-type-error

      interface definedEnv {
        [key: string]: string
      }
      
      const workingEnv = () => {
        let pe:definedEnv = {};
        for(const [key, value] of Object.keys(process.env).entries()) {
          pe[key] = value ?? "";
          return pe;
        }
      }
      
      //profile is based on .bashrc
      const ptyProcess = pty.spawn(shell, [], {
        name: "xterm-color",
        cols: 80,
        rows: 24,
        cwd: process.env.HOME,
        env: workingEnv()
    });

    ptyProcess.on('data', (data: any): void  => {
        mainWindow.webContents.send("terminal.incoming", data);
        //console.log("Terminal Incoming Data Sent");
    });

    ipcMain.on("terminal.keystroke", (event, key): void => {
        ptyProcess.write(key);
    });

    //mainWindow.hide() fixes the error "... Uncaught Exception: TypeError: Object has been destroyed ...".
    //the terminals are synced across tabs and are not separate processes. 
    //thus, closing a tab will destroy the correlated terminal object and cause the app to break.

    mainWindow.on('close', (e) => {
      let response = dialog.showMessageBoxSync(mainWindow, {
          type: 'info',
          buttons: ['Yes', 'No', 'Quit App'],
          title: 'Confirm',
          message: 'Are you sure you want to close? '
      });

      if(response == 1) {
        //if button == 'No', then cancel the window close.
        e.preventDefault(); 
      } else {
        //if button == 'Yes', then "close the window" and hide it. 
        e.preventDefault();
        mainWindow.hide();
      } 
      if(response == 2) {
        //if button == 'Quit', then kill the process (send SIGKILL).
        //this is a workaround to allow the above terminal hack to work. 
        //without it, you won't be able to quit the app unless you do a force quit.
        //that's not good, so sending a signal kill is the *best way* to combat the issue.
        execSh("kill -9 " + process.pid)
      }
  });

    //log current process pid 
    if(process.pid) {
      console.log("Current pid of app: " + process.pid);
    }
};

//method is called when electron is finished initialization and is ready to create browser windows
app.whenReady().then(() => {
    createWindow();

//re-create window when dock icon is clicked and no other windows are open 
app.on('activate', () => {
  if(BrowserWindow.getAllWindows().length === 0) {
    createWindow();
   }
});
    
//quit app when window is closed (windows + linux) except on MacOS
//this is overridden by dialog method (?)
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