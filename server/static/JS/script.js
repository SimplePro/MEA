// window.onload = function () {
    

    // var clicker = document.getElementById("dialogue");
    // clicker.onclick = move;
// }

var dialogue_container = document.getElementsByClassName("dialogue_container")[0]
let passages = new Object()

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
    location.href = "?title=" + title
}