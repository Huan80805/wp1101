let img_array = [];
let album_list = [];

let ss = ["https://imgur.dcard.tw/HsYRtMO.jpg",
    "https://imgur.dcard.tw/7yR41xFh.jpg",
    "https://imgur.dcard.tw/VCRildqh.jpg",
    "https://imgur.dcard.tw/AsXX01vh.jpg",
    "https://imgur.dcard.tw/ZpXvteZh.jpg",
    "https://imgur.dcard.tw/eeZodn3h.jpg"
];
let memes = ["https://memeprod.sgp1.digitaloceanspaces.com/user-wtf/1628615836163.jpg",
    "https://memeprod.sgp1.digitaloceanspaces.com/user-wtf/1608453277127.jpg",
    "https://memeprod.sgp1.digitaloceanspaces.com/user-wtf/1608453143966.jpg",
    "https://memeprod.sgp1.digitaloceanspaces.com/user-wtf/1620640830116.jpg",
    "https://cdn2.ettoday.net/images/4562/4562659.jpg",
    "https://cdn2.ettoday.net/images/4562/4562663.jpg",
    "https://cdn2.ettoday.net/images/4562/4562656.jpg",
    "https://cdn2.ettoday.net/images/4562/4562668.jpg",
    "https://cdn2.ettoday.net/images/4562/4562669.jpg",
    "https://cdn2.ettoday.net/images/4562/4562671.jpg",
    "https://cdn2.ettoday.net/images/4562/4562672.jpg",
    "https://cdn2.ettoday.net/images/4562/4562673.jpg"
];
class Album {
    constructor(name) {
        this.name = name;
        img_array[this.name] = [];
    }
    get previewelement() {
        var template = document.createElement("template");
        var html = '<div class="album-preview" id=' + this.name + ' onclick="selectalbum(this.id)">\
        <div class="album-preview-container">';
        for (let numberofimg = 0; numberofimg < img_array[this.name].length; numberofimg++) {
            if (numberofimg < 4) {
                html += '<img class="album-preview-image i' + (numberofimg + 1) +
                    '" src=' + img_array[this.name][numberofimg] + '>';
            }
        }
        html += '<div class="album-name">\
        <a class="album-name-text">' + this.name + '</a>\
        </div></div></div>';
        template.innerHTML = html;
        return template.content.cloneNode(true);
    }
    resetalbumpreview() {
        var container = document.getElementById(this.name).getElementsByClassName("album-preview-container")[0];
        var elements = container.getElementsByClassName("album-preview-image");
        while (elements[0]) {
            elements[0].parentNode.removeChild(elements[0]);
        }
        var template = document.createElement("template");
        var html = ''
        for (let numberofimg = 0; numberofimg < img_array[this.name].length; numberofimg++) {
            if (numberofimg < 4) {
                html += '<img class="album-preview-image i' + (numberofimg + 1) +
                    '" src=' + img_array[this.name][numberofimg] + '>';
            }
        }
        template.innerHTML = html;
        let albumpreview_background = document.getElementById(this.name).getElementsByClassName("album-preview-container")[0];
        albumpreview_background.appendChild(template.content.cloneNode(true));
    }
    addimg(url) {
        img_array[this.name].push(url);
        changepreview(this.name);
    }
    removeimgindex(index) {
        img_array[this.name].splice((index - 1), 1);
        selectalbum(this.name);
    }
}

let currentalbumname = "ss",
    currentimgidx = -1;

let bigimage = document.getElementById("bigimage");

setalbum('ss', ss);
setalbum('memes', memes);
setalbum('empty');
selectalbum('ss');
selectbigimg(0);

function selectbigimg(index) {
    viewimage = document.getElementsByClassName("view");
    if (currentimgidx != index) {
        bigimage.src = img_array[currentalbumname][index];
        viewimage[index].classList.add("hightlight");
        for (let ind = 0; ind < viewimage.length; ind++) {
            if (ind != index) {
                viewimage[ind].classList.remove("hightlight");
            }
        }
        currentimgidx = index;
    } else {
        bigimage.src = img_array[currentalbumname][index];
        viewimage[index].classList.add("hightlight");
        currentimgidx = index;
    }
    numberofimage()
}

function selectalbum(name) {
    if (currentalbumname !== name) {
        if (img_array[name] !== undefined && img_array[name].length > 0) {
            albumselect = document.getElementById(currentalbumname);
            albumselect.style.backgroundColor = "rgb(0, 0, 0)";
            albumselect = document.getElementById(name);
            albumselect.style.backgroundColor = "rgba(255, 166, 0, 0.700)";
            changepreview(name);
            currentalbumname = name;
            selectbigimg(0);
        } else {
            alert("This is a empty album. Please choose another album.")
        }
    } else {
        if (img_array[name] !== undefined && img_array[name].length > 0) {
            albumselect = document.getElementById(name);
            albumselect.style.backgroundColor = "rgba(255, 166, 0, 0.700)";
            changepreview(name);
            currentalbumname = name;
            selectbigimg(0);
        } else {
            alert("This is a empty album. Please choose another album.")
        }
    }
}

function changepreview(albumname) {
    var container = document.getElementsByClassName("preview-container")[0];
    var elements = container.getElementsByClassName("view");
    while (elements[0]) {
        elements[0].parentNode.removeChild(elements[0]);
    }

    var template = document.createElement("template");
    for (let i = 0; i < img_array[albumname].length; i++) {
        var html = '<div id=' + String(i) + ' class="view" onclick="selectbigimg(this.id)">\
        <img class="image" src=' + img_array[albumname][i] + '>\
        <div class="interaction-view">\
        <div class="text">\
        <a class="wtf">No. ' + String(i + 1) + '</a>\
        </div></div></div>';
        template.innerHTML = html;
        container.appendChild(template.content.cloneNode(true));
    }
    selectbigimg(0);
}

function setalbum(albumname, initial = []) {
    let newalbum = new Album(albumname);
    album_list.push(newalbum);
    if (initial.length > 0) {
        for (let iniurl of initial) {
            newalbum.addimg(iniurl);
        }
    }
    let albumpreview_background = document.getElementsByClassName("album-background")[0];
    albumpreview_background.appendChild(newalbum.previewelement);
    resetdrop(album_list);
}

function removealb(albname) {
    for (let al of album_list) {
        if (al.name === albname) {
            delete img_array[albname];
            album_list.splice(al, 1)
            var elements = document.getElementById(albname);
            elements.parentNode.removeChild(elements);
        }
    }
    resetdrop(album_list);
}

function numberofimage() {
    numofalb = document.getElementById("totalnumberofimage");
    var no = Number(currentimgidx) + Number(1);
    var n = 0
    for (let al of album_list) {
        n += img_array[al.name].length;
    }
    numofalb.innerHTML = 'Image No. ' + no + ' / ' + img_array[currentalbumname].length + ' / Total ' + n;
}


document.getElementById("addurl").addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("myButton").onclick();
    }
});

function buttonCode() {
    var valueofurl = document.getElementById("addurl").value;
    var mode = document.getElementById("mode-bottom").innerHTML;
    var alb = document.getElementById("al-bottom").innerHTML.replace('Album-', '');

    if (mode === 'Add') {
        if (alb !== 'Change-Album') {
            for (let al of album_list) {
                if (al.name === alb) {
                    al.addimg(valueofurl);
                    al.resetalbumpreview();
                }
            }
            selectalbum(alb);
        } else {
            setalbum(valueofurl);
        }
    } else if (mode === 'Remove') {
        if (alb !== 'Change-Album') {
            var ind = 0;
            for (let al of album_list) {
                if (al.name === alb) {
                    console.log(valueofurl)
                    al.removeimgindex(valueofurl);
                    al.resetalbumpreview();
                } else {
                    ind = album_list.indexOf(al);
                }
            }
            selectalbum(album_list[ind].name);
        } else {
            removealb(alb);
        }
    }
    document.getElementById("mode-bottom").innerHTML = 'Mode'
    document.getElementById("al-bottom").innerHTML = 'Album'
    document.getElementById("addurl").value = '';
}

function myFunction(id) {
    document.getElementById(id).parentNode.getElementsByClassName("dropdown-content")[0].classList.toggle("show");
    window.onclick = function(event) {
        if (!event.target.matches('.' + document.getElementById(id).classList[0])) {
            var dropdowns = document.getElementById(id).parentNode.getElementsByClassName("dropdown-content");
            var i;
            for (i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
        }
    }
}

function choosemode(id) {
    document.getElementById("mode-bottom").innerHTML = id;
    resetdrop(album_list);
}

function choosealb(id) {
    document.getElementById("al-bottom").innerHTML = id;
    resetdrop(album_list);
}

function resetdrop(list) {
    var container = document.getElementById("al-myDropdown");
    var elements = container.getElementsByClassName("menu");
    while (elements[1]) {
        elements[1].parentNode.removeChild(elements[1]);
    }
    for (let al of list) {
        var template = document.createElement("template");
        var html = '<a class="menu" id="Album-' + al.name + '" onclick="choosealb(this.id)">' + al.name + '</a>';
        template.innerHTML = html;
        document.getElementById("al-myDropdown").appendChild(template.content.cloneNode(true));
    }

    var mode = document.getElementById("mode-bottom").innerHTML;
    var alb = document.getElementById("al-bottom").innerHTML.replace('Album-', '');

    if (mode !== 'Mode' && alb !== 'Album') {
        if (mode === 'Add') {
            if (alb === 'Change-Album') {
                document.getElementById('addurl').placeholder = 'Input Album Name';
            } else {
                document.getElementById('addurl').placeholder = 'Input Image URL';
            }
        } else {
            if (alb === 'Change-Album') {
                document.getElementById('addurl').placeholder = 'Input Album Name';
            } else {
                document.getElementById('addurl').placeholder = 'Input Image NO.';
            }
        }
    }
}