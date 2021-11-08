let age = confirm("age >= 18?");
if(age){
    alert("you are free to enter")
}else{
    alert("liar")
}
let counter = 0;
let selectpic = document.getElementById('p1');
let picList = [
    "https://img-9gag-fun.9cache.com/photo/a3wxbd3_700bwp.webp", 
    "https://m.media-amazon.com/images/M/MV5BYTdhYWU3OGEtZWZlMS00ZWM2LTliNTEtMDcyNzg0MWU0NDhkXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_UY1200_CR100,0,630,1200_AL_.jpg",
    "https://i.pinimg.com/originals/b0/16/35/b016352c525c188a5592e02a7aeed789.jpg",
    "https://t8bet.club/wp-content/uploads/2021/08/mia-khalifa-1.jpeg",
    "https://notagamer.net/wp-content/uploads/2020/01/image-316.png",
    "https://i.pinimg.com/originals/01/ff/6e/01ff6e574c13777522d7a4d88c0a53a8.jpg",
    "https://c.wallhere.com/photos/79/20/lena_paul_blonde-1274697.jpg!d",
    "https://steamuserimages-a.akamaihd.net/ugc/1013814773803580697/05EE2D0DE67A6D5A9E09ADCFD961FB5E6DE7FF6B/?imw=1024&imh=1019&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true"
]

let nameText = document.getElementById('name');
let favpic = document.getElementById('favpic');
const p1 = document.getElementById('p1');
p1.addEventListener('click', function(){selectNew(0)});
const p2= document.getElementById('p2');
p2.addEventListener('click', function(){selectNew(1)});
const p3 = document.getElementById('p3');
p3.addEventListener('click', function(){selectNew(2)});
const p4 = document.getElementById('p4');
p4.addEventListener('click', function(){selectNew(3)});
const p5 = document.getElementById('p5');
p5.addEventListener('click', function(){selectNew(4)});
const p6 = document.getElementById('p6');
p6.addEventListener('click', function(){selectNew(5)});
const p7 = document.getElementById('p7');
p7.addEventListener('click', function(){selectNew(6)});
const p8 = document.getElementById('p8');
p8.addEventListener('click', function(){selectNew(7)});
function selectNew(num){
    selectpic.classList.remove('selectPic');
    counter = num;
    switch(num){
        case 0:
            selectpic = p1;
            selectpic.classList.add('selectPic');
            nameText.innerHTML = "Lana Rhodes";
            favpic.src = picList[0]
            break;
        case 1:
            selectpic = p2;
            selectpic.classList.add('selectPic');
            nameText.innerHTML = "Abella Danger";
            favpic.src = picList[1]
            break;
        case 2:
            selectpic = p3;
            selectpic.classList.add('selectPic');
            nameText.innerHTML = "Riley Reid";
            favpic.src = picList[2]
            break;
        case 3:
            selectpic = p4;
            selectpic.classList.add('selectPic');
            nameText.innerHTML = "Mia Khalifa";
            favpic.src = picList[3]
            break;
        case 4:
            selectpic = p5;
            selectpic.classList.add('selectPic');
            nameText.innerHTML = "Elva Elvie";
            favpic.src = picList[4]
            break;
        case 5:
            selectpic = p6;
            selectpic.classList.add('selectPic');
            nameText.innerHTML = "Mia Malkova";
            favpic.src = picList[5]
            break;
        case 6:
            selectpic = p7;
            selectpic.classList.add('selectPic');
            nameText.innerHTML = "Lena Paul";
            favpic.src = picList[6]
            break;
        case 7:
            selectpic = p8;
            selectpic.classList.add('selectPic');
            nameText.innerHTML = "Emily Willis";
            favpic.src = picList[7]
            break;       
    }
}

function changePic(num){
    if(num + counter > 7){
        counter = -1;
    }else if(num + counter < 0){
        counter = 8;
    }
    counter += num;
    selectNew(counter);
}


const left = document.getElementById('left');
left.addEventListener('click', function(){changePic(-1)});
const right = document.getElementById('right');
right.addEventListener('click', function(){changePic(1)});


