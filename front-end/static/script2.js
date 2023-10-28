const dialogue = "A fascinating species of water flea exhibits a kind of flexibility that evolutionary biologists call adaptive plasticity? If the baby water flea is developing into an adult in water that includes the chemical signatures of creatures that prey on water fleas, it develops a helmet and spines to defend itself against predators. If the water around it doesn’t include the chemical signatures of predators, the water flea doesn’t develop these protective devices. That’s a clever trick, because producing spines and a helmet is costly, in terms of energy, and conserving energy is essential for an organism’s ability to survive and reproduce. The water flea only expends the energy needed to produce spines and a helmet when it needs to. 	So it may well be that this plasticity is an adaptation: a trait that came to exist in a species because it contributed to reproductive fitness. There are many cases, across many species, of adaptive plasticity. Plasticity is conducive to fitness if there is sufficient variation in the environment.";
//const dialogue_blank = "Is the ________ always right? When customers return a broken _______ to a famous _______, which _____ kitchen and bathroom fixtures, the company nearly always ______ a ___________ to maintain good customer _________. Still, “there are _____ you’ve got to say ‘no,’” explains the warranty expert of the company, such as when a product is undamaged or has been abused. ____________ ______ _____, who owns an _________ company, says, “_____ the customer is ‘always’ right, sometimes you just have to fire a customer.” When Thorp has tried everything to _______ a complaint and realizes that the customer will be dissatisfied no ______ what, she returns her attention to the rest of her customers, who she says are “the reason for my success."
var dialogue_blank = '';
var dialogue_blank_json = new Object();

var dialogue_scramble = '';
var dialogue_scramble_json = new Object();
/*
function splitTextIntoSentences(text) {
    // 문장 구분자로 텍스트를 나눕니다.
    const sentences = text.split(/([\.\?\!])/);

    // 빈 문자열 및 공백을 제거합니다.
    const cleanSentences = sentences
        .map(sentence => sentence.trim())
        .filter(sentence => sentence.length > 0);

    
        
    return cleanSentences;
}

const longText = "여기에 긴 텍스트가 있습니다. 이 텍스트는 문장 단위로 나누어질 것입니다. 물음표와 느낌표도 처리할 것입니다! 다른 문장도 추가할 수 있습니다. 마침표를 사용하여 각 문장을 구분합니다.";

const sentencesArray = splitTextIntoSentences(dialogue);

// 나눠진 문장들을 출력합니다.

let splittedSentences = [];

for(let i=0;i<sentencesArray.length;i+=2){
    splittedSentences.push(sentencesArray[i]+sentencesArray[i+1]);
}
*/

//for (const sentence of splittedSentences) {
var temp = document.createElement("p");
temp.innerHTML = `<p id="sentence" style="text-align: justify; font-size: 30px; line-height: 40px;">${dialogue}</p>`;
document.getElementById("dialogue_main").appendChild(temp);
//}

var dialogue_sum = document.createElement("p");
dialogue_sum.setAttribute("id","dialogue_summary_text");
dialogue_sum.setAttribute("style","text-align: justify; font-size: 30px; line-height: 40px;");
dialogue_sum.innerText = `요약문: {{summary}}`;
document.getElementById("dialogue_sum").appendChild(dialogue_sum);

var dialogue_key_sentence = document.createElement("p");
dialogue_key_sentence.setAttribute("id","dialogue_key_sentence");
dialogue_key_sentence.setAttribute("style","text-align: justify; font-size: 30px; line-height: 40px;");
dialogue_key_sentence.innerText = `주요 문장: {{key_sentence}}`;
document.getElementById("dialogue_key").appendChild(dialogue_key_sentence);








function blank_change() {
    document.getElementById("btn").innerHTML = '';
    document.getElementById("dialogue_sum").setAttribute("style","display: none;");
    document.getElementById("dialogue_key").setAttribute("style","display: none;");

    fetch("http://112.187.184.213:5000/get_blank", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            passage: dialogue
        })
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            dialogue_blank_json = data;
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
    input_section.setAttribute("id", "input_section");
    input_section.setAttribute("onkeyup","if(window.event.keyCode == 13){binkhan_dab_matchugi()}");
    document.getElementById("answer_section").appendChild(input_section);

    var answer_btn = document.createElement("button");
    answer_btn.setAttribute("id", "answer_btn");
    answer_btn.setAttribute("onclick", "binkhan_dab_matchugi()");
    answer_btn.innerHTML = `<p style="font-size: 15px; margin: auto auto;">다음</p>`
    document.getElementById("answer_section").appendChild(answer_btn);
}

var index = 0;
function binkhan_dab_matchugi() {
    document.getElementById("right_wrong_section").innerHTML = '';

    var right_wrong = document.createElement('div');
    right_wrong.setAttribute("id", "right_wrong");
    right_wrong.setAttribute("style", "color: #FFFFFF; display: flex;");
    document.getElementById("right_wrong_section").appendChild(right_wrong);
    // var right_wrong = document.createElement('div');
    // right_wrong.setAttribute("id","right_wrong");
    // right_wrong.setAttribute("style","color: #FFFFFF; display: flex;");
    var input = document.getElementById("input_section").value;
    console.log(input, index);
    if (dialogue_blank_json.answer[index] == input) {
        index++;
        right_wrong.innerText = "정답!";
        document.getElementById("input_section").value = null;
    }
    else {
        index += 0;
        right_wrong.innerText = "다시 시도하세요.";
        document.getElementById("input_section").value = null;
    }
}







function scramble_change() {
    document.getElementById("btn").innerHTML = '';

    document.getElementById("answer_section").innerHTML = '';
    document.getElementById("right_wrong_section").innerHTML = '';

    document.getElementById("dialogue_sum").setAttribute("style","display: none;");
    document.getElementById("dialogue_key").setAttribute("style","display: none;");

    fetch("http://112.187.184.213:5000/get_scramble", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            passage: dialogue
        })
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            dialogue_scramble_json = data;
            // const json = /÷data;
            dialogue_scramble = data.scramble;

            let dialogue_main = document.getElementById("dialogue_main");
            dialogue_main.innerHTML = "";

            var newElement_scramble = document.createElement("p");
            newElement_scramble.innerHTML = `<p style="text-align: justify; font-size: 30px; line-height: 40px;">${dialogue_scramble}</p>`;
            document.getElementById("dialogue_main").appendChild(newElement_scramble);
            console.log(dialogue_scramble);
        })
        .catch(err => {
            console.log(err);
        })

    var input_section = document.createElement("input");
    input_section.setAttribute("id", "input_section");
    input_section.setAttribute("onkeyup","if(window.event.keyCode == 13){scramble_dab_matchugi()}");
    document.getElementById("answer_section").appendChild(input_section);

    var answer_btn = document.createElement("button");
    answer_btn.setAttribute("id", "answer_btn");
    answer_btn.setAttribute("onclick", "scramble_dab_matchugi()");
    answer_btn.innerHTML = `<p style="font-size: 15px; margin: auto auto;">다음</p>`
    document.getElementById("answer_section").appendChild(answer_btn);
}


var idx = 0;

function scramble_dab_matchugi() {
    // var right_wrong = document.createElement('div');
    // right_wrong.setAttribute("id","right_wrong");
    // right_wrong.setAttribute("style","color: #FFFFFF; display: flex;");
    document.getElementById("right_wrong_section").innerHTML = '';

    var right_wrong_sc = document.createElement('div');
    right_wrong_sc.setAttribute("id", "right_wrong_sc");
    right_wrong_sc.setAttribute("style", "color: #FFFFFF; display: flex;");
    document.getElementById("right_wrong_section").appendChild(right_wrong_sc);

    var input = document.getElementById("input_section").value;
    console.log(input, idx);
    if (dialogue_scramble_json.answer == input) {
        idx++;
        right_wrong_sc.innerText = "정답!";
        scramble_change();
        document.getElementById("input_section").value = null;

    }
    else {
        idx += 0;
        right_wrong_sc.innerText = "다시 시도하세요.";
        document.getElementById("input_section").value = null;

    }
}