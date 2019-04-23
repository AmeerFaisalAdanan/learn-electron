const electron = require('electron')
const url = require('url')
const path = require('path')




const {app, BrowserWindow, Menu} = electron;


let mainWindow;
let addWindow;


// listen for app to be ready //#endregion


app.on('ready', function(){
    mainWindow = new BrowserWindow({});
    // load html window
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'mainWindow.html'),
        protocol: 'file',
        slashes: true
    }));
    // build menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    Menu.setApplicationMenu(mainMenu);


});


// handle create add window

function createAddWindow(){
    addWindow = new BrowserWindow({
        width: 200,
        height: 300,
        title: 'Add shopping list item'

    });
    // load html window
    addWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'addWindow.html'),
        protocol: 'file',
        slashes: true
    }));
}


// create menu template


const mainMenuTemplate = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Add Item',
                click(){
                    createAddWindow
                }
            },
            {
                label: 'Clear Items'
            },
            {
                label: 'Quit',
                accelerator: process.platform == 'darwin' ? 'Command+Q':
                'Ctrl+Q',
                click(){
                    app.quit();
                }
            }
        ]
    }
];


// add stuff to menu

