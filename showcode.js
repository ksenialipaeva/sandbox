document.addEventListener("DOMContentLoaded", function(event) { 
setAutoCopyFeatures(); // Инициализация скрипта для копирования кода

function setAutoCopyFeatures() {

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
        //let fragment = create('<button class="js-copy-btn">Копировать<svg class="icon-copy" role="img" aria-label="Скопировать в буфер обмена"><title>Копировать</title></svg></button>');
        let fragment = create('<button class="js-copy-btn"><img src="images/icons/copy.svg"> Копировать</button>');
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
    insertButtonCopy();
    onclick_copyFrom();

    function onclick_copyFrom() {
    let btn = document.querySelectorAll('.js-copy-btn');

    for( let i = 0; i < btn.length; i++ ) {
      btn[i].addEventListener('click', function() {
        let parentDiv = this.parentNode;
        let childCheck = parentDiv.querySelector('.js-copy-done');
        if(childCheck) return; // Если еще существует .js-copy-done, то прерываем (проверка на двойное нажатие)

        let copyCode = this.nextSibling;
        
        copyToClipboard(copyCode.textContent);
        ui_copyDone(this);
      });
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

    function ui_copyDone(btn) {
        var doneElement = create('<div class="js-copy-done">Скопировано</div>');
        let parentDiv = btn.parentNode;
        parentDiv.insertBefore(doneElement, btn);
        var insertedElement = parentDiv.querySelector('.js-copy-done');

        if(parentDiv.scrollTop > 0) { // Если была прокрутка, то сдвигаем к центру (горизонталь)
            insertedElement.style.top = parentDiv.scrollTop+(parentDiv.getBoundingClientRect().height/2)+"px";
        }
        if(parentDiv.scrollLeft > 0) { // Если была прокрутка, то сдвигаем к центру (вертикаль)
            insertedElement.style.left = parentDiv.scrollLeft+(parentDiv.clientWidth/2)+"px";
        }

        setTimeout(function() { // Пауза перед исчезновением
            var child = parentDiv.querySelector('.js-copy-done');
            child.classList.add('faded');
            removeCopyDone(child);
        }, 500);

        function removeCopyDone(child) {
            setTimeout(function() {
                parentDiv.removeChild(child);
            }, 500);
        }
    }
}

});