// 수정한 부분
var dialogue_blank = '';
var dialogue_blank_json = new Object();

dialogue = document.getElementById("dialogue_text").innerText

// 여기까지 수정

function blank_change() {
    document.getElementById("btn").innerHTML = '';

    fetch("http://112.187.184.213:5000/get_blank", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            passage: dialogue,
            n_blank: 10
        })
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            dialogue_blank_json=data;
            // const json = /÷data;
            dialogue_blank = data.result;

            let dialogue_main = document.getElementById("dialogue_main");
            dialogue_main.innerHTML = "";

            var newElement_blank = document.createElement("p");
            newElement_blank.innerHTML = `<p style="text-align: justify; font-size: 30px; line-height: 40px;">${dialogue_blank}</p>`;
            document.getElementById("dialogue_main").appendChild(newElement_blank);
            console.log(dialogue_blank);
        })
        .catch(err => {
            console.log(err);
        })

    var input_section = document.createElement("input");
    input_section.setAttribute("id","input_section");
    document.getElementById("answer_section").appendChild(input_section);

    var answer_btn = document.createElement("button");
    answer_btn.setAttribute("id","answer_btn");
    answer_btn.setAttribute("onclick","binkhan_dab_matchugi()");
    answer_btn.innerHTML = `<p style="font-size: 15px; margin: auto auto;">다음</p>`
    document.getElementById("answer_section").appendChild(answer_btn);
}

var index = 0;
var right_wrong = document.createElement('div');
right_wrong.setAttribute("id","right_wrong");
right_wrong.setAttribute("style","color: #FFFFFF; display: flex;");
document.getElementById("answer_section").appendChild(right_wrong);

function binkhan_dab_matchugi () {
    // var right_wrong = document.createElement('div');
    // right_wrong.setAttribute("id","right_wrong");
    // right_wrong.setAttribute("style","color: #FFFFFF; display: flex;");
    const input = document.getElementById("input_section").value;
    console.log(input, index);
    if (dialogue_blank_json.answer[index]==input) {
        index++;
        right_wrong.innerText = "정답!";
    }
    else {
        index+=0;
        right_wrong.innerText = "다시 시도하세요.";
    }
}