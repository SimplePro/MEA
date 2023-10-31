function move () {
    location.href = 'main2';
}

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
    var clicker = document.getElementById("dialogue");
    clicker.addEventListener('click',move,false);
}



function send_passage() {
    var title = document.getElementById("dialogue_title_input").value;
    var passage = document.getElementById("dialogue_passage_input").value;

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
        })
        .catch(err => {
            console.log(err);
        })
    
    title = '';
    passage = '';

}