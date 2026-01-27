//Собираем все заголовки h2 в список
let h2_content = document.getElementsByTagName('h2');

let productList = [];
let h1 = document.getElementsByTagName('h1')[0];

for (let j=0;j<h2_content.length;j++){
    h2_content[j].id = j;
    productList.push(h2_content[j].textContent);
}
 
let ul = document.createElement('ul');
ul.classList.add('content_table');
h1.after(ul);
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
//подсвечиваем главы по мере прокрутки
window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const elHeaders = document.querySelectorAll('h2');
    let headerId = '';
    for (let i = elHeaders.length - 1; i >= 0; i--) {
      if (elHeaders[i].getBoundingClientRect().top + window.scrollY - 200 < scrollTop) {
        headerId = elHeaders[i].id;
        break;
      }
    }
    document.querySelectorAll('.content_table a.active').forEach(el => {
      el.classList.remove('active');
    });
    if (headerId) {
      document.querySelector(`a[href$="#${headerId}"]`).classList.add('active');
    }
  });