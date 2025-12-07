/* 
<li>
    <div>
    <span></span>
    </div>
    <span></span>
    <span></span>
</li>
*/
//маленький формат
//сделать экспорт в массив и экспорт в цсс
//сделать копирование хекс по клику

let colorMixStr = ["color-mix(in lab, var(",")"];

function colorMixCSS (c1,c2,p1) {
    p1-=3;
    let p2=100-p1;
    return (colorMixStr[0]+c1+") "+p1+"%, var("+c2+") "+colorMixStr[1]);
}
//colorsContainer[0].style.backgroundColor = colorMixCSS("--main--dark","--main--light",50);

let colorsContainer = document.getElementsByClassName("colors-container");


//создаем карточку цвета
function createColorCard (name, hex, base) {
    let colorBlock = document.createElement('li');
    let colorShow = document.createElement('div');
    colorShow.style.backgroundColor = "#"+ hex;
    let colorName = document.createElement('span');
    colorName.textContent = name;
    let colorHEX = document.createElement('span');
    colorHEX.textContent = "#"+ hex;


    if (base)    {
        let spanBase = document.createElement('span');
        spanBase.textContent = "B";
        colorShow.append(spanBase);
    }

    colorBlock.append(colorShow);
    colorBlock.append(colorName);
    colorBlock.append(colorHEX);

    let copied = "#"+ hex;
    colorBlock.addEventListener('click', listenerCopy(colorBlock,copied,colorShow,'<img src="images/icons/copy.svg">'));

    return colorBlock;
}

function hextorgb (hex) {
    let rgb=[];
    rgb.push(parseInt(hex.substr(0,2), 16));
    rgb.push(parseInt(hex.substr(2,2), 16));
    rgb.push(parseInt(hex.substr(4,2), 16));
    //console.log(rgb);
    return(rgb);
}

function baseMix (c_trans,c_base,p) {
    let percent = p/100;
    let mix10 = c_trans*percent+c_base*(1-percent);
    let mix16 = ((Math.floor(mix10)).toString(16));
    while (mix16.length < 2) mix16=0+mix16;
    return mix16;
}

function rgbMix (c1,c2,p) {
    let rgb=[];
    rgb.push(baseMix(c1[0],c2[0],p));
    rgb.push(baseMix(c1[1],c2[1],p));
    rgb.push(baseMix(c1[2],c2[2],p));
    //console.log(rgb[0]+rgb[1]+rgb[2]);
    return (rgb[0]+rgb[1]+rgb[2]);
}

let colorLight = "F6FAFB";
let colorDark = "300739";
let colorBrand = ["AC1BCD","1B98CD","FFD400","D23483"];

let colors = [
    ["main",[["light",colorLight,true],["dark",colorDark,true]]],
    ["grays",[]],
    ["brand",[]],
    ["brand1",[]],
    ["brand2",[]],
    ["brand3",[]],
    ["success",[["success light","C0ECBC",true],["success medium","43D037",true],["success dark","2B8223",true]]],
    ["warning",[["warning light","F6EFB9",true],["warning medium","FFE31C",true],["warning dark","9C8A0C",true]]],
    ["danger",[["danger light","F3CCCC",true],["danger medium","EB2023",true],["danger dark","940F11",true]]],
    ["link",[["link","3027DD",true],["link hover","2B24A3",true],["link active","141156",true],["link visited","6E238A",true]]],
    
]

let grays = [[90,false],[70,false],[50,true],[30,false],[20,false],[10,true],[3,true]];
let brand = [[["brand"],[[5,false],[15,false],[50,true]],[[70,false],[40,true],[20,false]]],
            [["brand1"],[[5,false],[15,false],[50,false]],[[70,false],[40,false],[20,false]]],
            [["brand2"],[[5,false],[15,false],[50,false]],[[70,false],[40,false],[20,false]]],
            [["brand3"],[[5,false],[15,false],[50,false]],[[70,false],[40,false],[20,false]]]];


//вставляем в массив серые
for (let i=0; i<grays.length; i++) {
    let hex = rgbMix(hextorgb(colorDark),hextorgb(colorLight),grays[i][0]);
    colors[1][1].push([grays[i][0],hex,grays[i][1]]);
}


//вставляем в массив брендовые
for (let j=0;j<brand.length;j++){

    for (let i =0;i<brand[j][1].length;i++) {
        let name = brand[j][0] + " " + brand[j][1][i][0] + "L";
        let hex = rgbMix(hextorgb(colorBrand[j]),hextorgb(colorLight),brand[j][1][i][0]);
        colors[2+j][1].push([name,hex,brand[j][1][i][1]]);
    }

    colors[2+j][1].push([brand[j][0],colorBrand[j],true]);

    for (let i =0;i<brand[j][2].length;i++) {
        let name = brand[j][0] + " " + brand[j][2][i][0] + "D";
        let hex = rgbMix(hextorgb(colorBrand[j]),hextorgb(colorDark),brand[j][2][i][0]);
        colors[2+j][1].push([name,hex,brand[j][2][i][1]]);
    }
}


//вставляем все цвета на страницу
for (let i=0;i<colors.length;i++) {
    let place = colorsContainer[i];
    for (let j =0;j<colors[i][1].length;j++) {
        let c = createColorCard(colors[i][1][j][0],colors[i][1][j][1],colors[i][1][j][2]);
        place.append(c);
    }
}




