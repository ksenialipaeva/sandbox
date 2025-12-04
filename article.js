/* Добавляем декоративную голубую полоску */
let body = document.getElementsByTagName("body")[0];
let decoration = document.createElement('span');
body.append(decoration);

/* Добавляем боковое меню */
let sidebar = [
    ['стили',
        [
            ['О системе','about.html'],
            ['Цвета','colors.html'],
            ['Сетка','grid.html'],
            ['Типографика','typography.html']
        ]],
    ['атомы',
        [
            ['Чекбоксы','checkboxes.html'],
            ['Радиобаттоны','radiobuttons.html'],
            ['Тогглы','toggles.html']
        ]],
    ['молекулы',
        [
            ['Поля ввода','inputs.html'],
            ['Кнопки','buttons.html'],
            ['Бейджи','badges.html'],
            ['Чипы','chips.html'],
            ['Хлебные крошки','breadcrumbs.html']
        ]],
    ['организмы',
        [
            ['Таблицы','tables.html'],
            ['Модальные окна','modals.html'],
            ['Боковое меню','sidemenu.html']
        ]]
]

let aside = document.createElement('aside');
body.prepend(aside);

let navigation = document.createElement('nav');
aside.appendChild(navigation);

let menu_list = document.createElement('ul');
navigation.appendChild(menu_list);

let a_logo = document.createElement('a');
a_logo.href = "index.html";
menu_list.appendChild(a_logo);

let logo = document.createElement('img');
logo.src = "images/logo.png";
a_logo.appendChild(logo);

//определяем на какой мы странице
let path = window.location.pathname;
let page = path.slice(path.lastIndexOf('/')+1);

//создает элемент <li> с вложенной ссылкой <a>
//задает ему контент (name), ссылку (link)
//присоединяет к родителю (parent)
//если мы на этой странице, то присваивает класс active
function createNameLinkAppend (name, link, parent, isActive) {
    let el = document.createElement('li');
    let a = document.createElement('a');
    a.textContent = name;
    a.href = link;
    if (isActive) a.classList.add("active");
    el.appendChild(a);
    parent.appendChild(el);
}

//для каждой секции меню
for (let j=0; j<sidebar.length; j++) {
    //создаем подзаголовок
    let sidebar_header = document.createElement('li');
    sidebar_header.textContent=sidebar[j][0];
    menu_list.appendChild(sidebar_header);
    
    //создаем вложенный список
    let sidebar_section = document.createElement('ul');
    sidebar_header.appendChild(sidebar_section);

    //заполняем страницы
    let isActive;
    for (let i=0; i<sidebar[j][1].length; i++) {
        if (sidebar[j][1][i].includes(page)) isActive=true;
        else isActive = false;
        createNameLinkAppend(sidebar[j][1][i][0],sidebar[j][1][i][1],sidebar_section,isActive);
    }
}
/*
//ищем по секциям совпадение
function findPage () {
    let pageCoord = [];
    for (let i=0; i<sidebar.length; i++) {
    for (let j=0; j<sidebar[i][1].length; j++) {
        if (sidebar[i][1][j].includes(page))  {
            pageCoord.push(i);
            pageCoord.push(j);
            return pageCoord;
            }
        }
    }
}*/


/*
//Настраиваем футер
let footer = document.createElement('footer');
body[0].appendChild(footer);
let p1 = document.createElement('p');
footer.appendChild(p1);
p1.textContent="Сайт создан";
let p2 = document.createElement('p');
footer.appendChild(p2);
p2.textContent="Липаевой Ксенией и Сидоренко Алёной";
let footer_img = document.createElement('img');
footer.appendChild(footer_img);
footer_img.src="images/logo.png";

*/