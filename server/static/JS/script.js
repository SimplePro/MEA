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

    for(key in data) {

        var dialogue = document.createElement("div")
        
        dialogue.setAttribute("id", "dialogue")
        
        var img = document.createElement("img")
        img.setAttribute("id", "dialogue_img")
        img.setAttribute("src", `data:image/jpeg;base64,${data[key].image}`)

        var title = document.createElement("div")
        title.setAttribute("id", "dialogue_title")
        title.innerHTML = key

        var desc = document.createElement("div")
        desc.setAttribute("id", "dialogue_desc")
        desc.innerHTML = data[key].summary

        var hr = document.createElement("hr")
        
        dialogue.appendChild(img)
        dialogue.appendChild(title)
        dialogue.appendChild(hr)
        dialogue.appendChild(desc)

        dialogue.addEventListener("click", (event) => move())

        dialogue_container.appendChild(dialogue)
    }
})
.catch(error => {
    console.log(error)
})

// dialogue_container.addEventListener('click', (e) => {
//     console.log(e.currentTarget.children[1])
// })


function move () {
    // location.href = "{{url_for('static', filename='templates/main2.html')}}";
    location.href = "title?"
}