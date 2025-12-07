function create(htmlStr) { // Вспомогательная функция для создания DOM-элемента
        var frag = document.createDocumentFragment(),
            temp = document.createElement('div');
        temp.innerHTML = htmlStr;
        while (temp.firstChild) {
            frag.appendChild(temp.firstChild);
        }
        return frag;
    }

    function insertButtonCopy() {
    let precode = document.querySelectorAll('pre code');
    
    for( let i = 0; i < precode.length; i++ ) { // Добавление кнопки к каждому блоку pre code
        let fragment = create('<button class="js-copy-btn empty-button medium-button"><img src="images/icons/copy.svg"> Копировать</button>');
        let parentDiv = precode[i].parentNode;
        parentDiv.insertBefore(fragment, precode[i]);

        parentDiv.addEventListener('scroll', function() { // Чтобы при скролле иконка оставалась на месте
            var btnCopy = parentDiv.querySelector('.js-copy-btn');
            var btnWidth = btnCopy.getBoundingClientRect().width;

            if(parentDiv.scrollTop > 0) { // При вертикальной прокрутке
                btnCopy.style.top = parentDiv.scrollTop+"px";
            } else {
                btnCopy.style.top = '';
            }
            if(parentDiv.scrollLeft > 0) { // При горизонтальной прокрутке
                let offsetBtnLeft = parentDiv.clientWidth + parentDiv.scrollLeft - btnWidth;
                btnCopy.style.right = 'unset';
                btnCopy.style.left = offsetBtnLeft + "px";
            } else {
                btnCopy.style.right = '0';
                btnCopy.style.left = '';
            }
        }, false);

        }
    }
let listenerCopy = function (copy,copied,cont,message){
	return function f() {
    
        let parentDiv = copy.parentNode;
        let childCheck = parentDiv.querySelector('.js-copy-done');
        if(childCheck) return; // Если еще существует .js-copy-done, то прерываем (проверка на двойное нажатие)
        
        copyToClipboard(copied);
        ui_copyDone(cont,message);
    }
}

    function onclick_copyFrom() {
    let btn = document.querySelectorAll('.js-copy-btn');



for( let i = 0; i < btn.length; i++ ) {
    let copied = btn[i].nextSibling.textContent;
    let popContainer = btn[i].parentNode;

    btn[i].addEventListener('click', listenerCopy(btn[i],copied,popContainer,"Код скопирован")); //(на что нажимают, откуда копируют, где появляется надпись, что содержит надпись)
    }
    }

    function copyToClipboard(str) {
        var area = document.createElement('textarea');

        document.body.appendChild(area);
        let replaced = str.replaceAll("\u00A0", " "); // Удаляем неразрывные пробелы
        area.value = replaced;
        area.select();
        document.execCommand("copy");
        document.body.removeChild(area);
    }

    function ui_copyDone(container,message) {
        
        var doneElement = create('<div class="js-copy-done">'+message+'</div>');
        
        
        container.prepend(doneElement);
        //var insertedElement = container.querySelector('.js-copy-done');

        /*if(container.scrollTop > 0) { // Если была прокрутка, то сдвигаем к центру (горизонталь)
            insertedElement.style.top = container.scrollTop+(container.getBoundingClientRect().height/2)+"px";
        }
        if(container.scrollLeft > 0) { // Если была прокрутка, то сдвигаем к центру (вертикаль)
            insertedElement.style.left = container.scrollLeft+(container.clientWidth/2)+"px";
        }*/

        setTimeout(function() { // Пауза перед исчезновением
            var child = container.querySelector('.js-copy-done');
            //child.classList.add('faded');
            removeCopyDone(child);
        }, 500);

        function removeCopyDone(child) {
            
            setTimeout(function() {
                container.removeChild(child);
            }, 500);
        }
    }


document.addEventListener("DOMContentLoaded", function(event) { 
setAutoCopyFeatures(); // Инициализация скрипта для копирования кода



function setAutoCopyFeatures() {

    
    insertButtonCopy();
    onclick_copyFrom();

}

});