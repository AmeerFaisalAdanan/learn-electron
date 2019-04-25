const electron = require('electron');
const {ipcRenderer} = electron;
const ul = document.querySelector('ul');

// catch add item
ipcRenderer.on('item:add', function (e, item){
    ul.className = 'collection-item';
    const li = document.createElement('li');
    const itemText = document.createTextNode(item);
    li.appendChild(itemText);
    ul.appendChild(li);
});

// clear item

ipcRenderer.on('item:clear', function (){

    ul.innerHTML = '';

});


        // remove individual item 

ul.addEventListener('dblclick', removeItem);


function removeItem(e){
    e.target.remove();
    if (ul.children.length == 0)
    {
        ul.className = '';
    }
}
