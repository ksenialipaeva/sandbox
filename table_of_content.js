//Собираем все заголовки h2 в список
let h2_content = document.getElementsByTagName('h2');
let productList = [];

for (let j=0;j<h2_content.length;j++){
    h2_content[j].id = j;
    productList.push(h2_content[j].textContent);
}
 
let ul = document.createElement('ul');
let content_table=document.createElement('div');
content_table.classList.add('content_table');
body.prepend(content_table);
content_table.appendChild(ul);
productList.forEach(renderProductList);
       
//добавляем заголовки h2 в список
function renderProductList(element, index) {
    var li = document.createElement('li');
    var a = document.createElement('a');
    ul.appendChild(li);
    li.appendChild(a);
    a.innerHTML=a.innerHTML + element;
    a.href = "#"+index;
}