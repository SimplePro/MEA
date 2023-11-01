function dialogue_add_section_show_hide() {
    var add_btn = document.getElementById("add_button");
    if(add_btn.style.visibility == "visible"){
        document.getElementById("dialogue_add_section").style.visibility="hidden";
    }
    else{
        document.getElementById("dialogue_add_section").style.visibility="visible";
    }
}

window.onload = function() {
    var add_btn = document.getElementById("add_button");
    add_btn.addEventListener('click',dialogue_add_section_show_hide,false);
    // var clicker = document.getElementById("dialogue");
    // clicker.addEventListener('click',move,false);
}

function send_passage() {
    var title = document.getElementById("dialogue_title_input").value;
    var passage = document.getElementById("dialogue_passage_input").value;
    document.body.style.opacity = 0.5;
    document.body.style.pointerEvents = 'none';

    fetch("http://112.187.184.213:5000/upload_passage", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: title,
            passage: passage
        })
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            document.body.style.opacity = 1.0;
            document.body.style.pointerEvents = "auto";
            location.reload(true);
        })
        .catch(err => {
            console.log(err);
        })

    title = '';
    passage = '';

}

var dialogue_container = document.getElementsByClassName("dialogue_container")[0]
let passages = new Object()
var synonyms = new Array(0)

const synonyms_text = document.getElementById("synonyms")
const synonym_btn = document.getElementById("synonym_btn")
const synonym_input = document.getElementById("synonym_input")
synonyms_text.innerHTML = "유의어를 검색하지 않았습니다."
synonyms_text.style.color = "rgba(255, 255, 255, 0.5)"

synonym_btn.addEventListener("click", (event) => {
    const word = synonym_input.value
    synonym_input.value = ""

    fetch("http://112.187.184.213:5000/get_synonyms", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
                word: word
        })
    })
    .then((response) => response.json())
    .then((data) => {
        if(data["synonyms_in_sentence"] == "") {
            synonyms_text.innerHTML = "유의어를 찾지 못했습니다."
            synonyms_text.style.color = "rgba(255, 255, 255, 0.5)"
        } else {
            synonyms_text.innerHTML = data["synonyms_in_sentence"]
            synonyms_text.style.color = "rgba(255, 255, 255, 1.0)"
        }
    })
})

fetch("http://112.187.184.213:5000/get_passages", {
    method: "GET",
    headers: {
        "Content-Type": "application/json"
    }
})
.then((response) => response.json())
.then((data) => {

    passages = JSON.parse(JSON.stringify(data))

    var index = 0

    for(key in data) {

        var dialogue = document.createElement("div")
        
        dialogue.setAttribute("id", "dialogue")
        dialogue.setAttribute("class", "dialogue" + index.toString())
        index++;
        
        var img = document.createElement("img")
        img.setAttribute("id", "dialogue_img")
        img.setAttribute("src", `data:image/jpeg;base64,${data[key].image}`)

        var title = document.createElement("div")
        title.setAttribute("id", "dialogue_title")
        title.setAttribute("class", "title")
        title.innerHTML = key

        var desc = document.createElement("div")
        desc.setAttribute("id", "dialogue_desc")
        desc.innerHTML = data[key].summary

        var hr = document.createElement("hr")
        
        dialogue.appendChild(img)
        dialogue.appendChild(title)
        dialogue.appendChild(hr)
        dialogue.appendChild(desc)

        dialogue.addEventListener("click", (event) => move(event))

        dialogue_container.appendChild(dialogue)
    }
})
.catch(error => {
    console.log(error)
})

// dialogue_container.addEventListener('click', (e) => {
//     console.log(e.currentTarget.children[1])
// })


function move (event) {
    
    switch(event.srcElement.id) {
        case "dialogue_title":
            title = event.srcElement.innerHTML
            break

        case "dialogue_desc":
            title = event.srcElement.parentElement.getElementsByClassName("title")[0].innerHTML
            break

        case "dialogue_img":
            title = event.srcElement.parentElement.getElementsByClassName("title")[0].innerHTML
            break

        case "dialogue":
            title = event.srcElement.getElementsByClassName("title")[0].innerHTML
    }

    console.log(title)
    synonyms_text.innerHTML = "유의어를 검색하지 않았습니다."
    synonyms_text.style.color = "rgba(255, 255, 255, 0.5)"

    location.href = "?title=" + title
}