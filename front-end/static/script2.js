const dialogue = "A fascinating species of water flea exhibits a kind of flexibility that evolutionary biologists call adaptive plasticity? If the baby water flea is developing into an adult in water that includes the chemical signatures of creatures that prey on water fleas, it develops a helmet and spines to defend itself against predators. If the water around it doesn’t include the chemical signatures of predators, the water flea doesn’t develop these protective devices. That’s a clever trick, because producing spines and a helmet is costly, in terms of energy, and conserving energy is essential for an organism’s ability to survive and reproduce. The water flea only expends the energy needed to produce spines and a helmet when it needs to. 	So it may well be that this plasticity is an adaptation: a trait that came to exist in a species because it contributed to reproductive fitness. There are many cases, across many species, of adaptive plasticity. Plasticity is conducive to fitness if there is sufficient variation in the environment.";
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

for (const sentence of splittedSentences) {
    var temp = document.createElement("p");
    temp.innerHTML = `<p style="text-align: justify; font-size: 30px; line-height: 40px;">${sentence}</p>`;
    document.getElementById("dialogue_main").appendChild(temp);
    console.log(sentence);
}