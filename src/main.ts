import { app, BrowserWindow } from 'electron'

import { globalShortcut } from 'electron';

//import * as path from 'path';

const createWindow = () => {
    //create new browser window with specific width + height dimensions
    const mainWindow = new BrowserWindow({
        width: 1080,
        height: 700,
        resizable: false,
        fullscreenable: false,
        frame: false,
        webPreferences: { 
            nodeIntegration: true,
            //preload: path.join(__dirname, 'build/preload.js')
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
                resizable: false,
                fullscreenable: false,
                frame: false,
            },
            webPreferences: { 
                nodeIntegration: true,
                //preload: path.join(__dirname, 'build/preload.js')
            }
          }
      })
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
        globalShortcut.register("CommandOrControl+R", () => {
            console.log("CommandOrControl+R: Shortcut Disabled");
        })
    });
});