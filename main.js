const electron = require('electron')
const url = require('url')
const path = require('path')




const {app, BrowserWindow, Menu, ipcMain} = electron;


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

    // quit app when close 

    mainWindow.on('closed', function()
    {
        app.quit();
    });


    // build menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    Menu.setApplicationMenu(mainMenu);


});



// handle create add window

function createAddWindow(){
    addWindow = new BrowserWindow({
        width: 300,
        height: 200,
        title: 'Add shopping list item'

    });
    // load html window
    addWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'addWindow.html'),
        protocol: 'file',
        slashes: true
    }));

    // garbage collection
    addWindow.on('close', function(){
        addWindow = null;
    });
}



// catch item add

ipcMain.on('item:add', function(e, item){
    console.log(item);
    mainWindow.webContents.send('item:add', item);
    addWindow.close();
});


// create menu template


const mainMenuTemplate = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Add Item',
                click(){
                    createAddWindow();
                }
            },
            {
                label: 'Clear Items',
                click(){
                    mainWindow.webContents.send('item:clear');
                }
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


//if mac, add empty object to menu
if (process.platform == 'darwin'){
    mainMenuTemplate.unshift({});
}


//add developer tools item if not in production

if(process.env.NODE_ENV !== 'production')
{
    mainMenuTemplate.push(
        {
            label: 'Developer Tools',
            submenu:[
                {
                    label: 'Toggle DevTools',
                    click(site, focusedWindow)
                    {
                        focusedWindow.toggleDevTools();
                    }
                },
                {
                    role: 'reload'
                }
            ]
        }
    )
}


// add stuff to menu

