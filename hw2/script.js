let imgs = document.getElementsByClassName('image')
let family = document.getElementById('family')
let pet = document.getElementById('pet')
let family_preview = document.getElementsByClassName('family_preview')
let pet_preview = document.getElementsByClassName('pet_preview')
function image_click(){
    for (let i = 0; i < imgs.length; i++) {
        imgs[i].addEventListener(
            'click', function(){
                display.src = imgs[i].src
                for (let i = 0; i < imgs.length; i++) {
                    imgs[i].style.border = "none"
                }
                imgs[i].style.border = "thick double blue"
            }
    )}
}
image_click()
family.addEventListener(
//change to family album
    'click', function(){
        family.style.color = 'red'
        pet.style.color = 'black'
        family_preview[0].style.opacity = "1.0"
        family_preview[0].style.width = "100%"
        pet_preview[0].style.opacity = "0.1"
        pet_preview[0].style.width = "1px"
    }
)


pet.addEventListener(
    'click', function(){
        pet.style.color = 'red'
        family.style.color = 'black'
        pet_preview[0].style.opacity = "1.0"
        pet_preview[0].style.width = "100%"
        family_preview[0].style.opacity = "0.1"
        family_preview[0].style.width = "1px"
    }
)

let empty = document.getElementById('empty')
empty.addEventListener(
    'click', function(){
        alert('這是空相簿')
    }
)

