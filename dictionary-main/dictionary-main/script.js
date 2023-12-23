<<<<<<< HEAD
const resultDiv = document.querySelector(".result");
const wordEle = document.querySelector("#word");
const phonetics = document.querySelector(".phonetics");
const audio = document.querySelector("audio");
const wordMeaning = document.querySelector(".word-definition");
const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";





const handle = async (e) => {
    if (e.keyCode == 13) {
        const word = e.target.value;
        // make a request to the api
        const result = await fetch(url + word);

        resultDiv.style.display = "block";
        const data = await result.json();
        if (result.ok) {

            document.querySelectorAll(".wordmeaning")[0].style.removeProperty("display");
            document.querySelectorAll(".wordmeaning")[1].style.removeProperty("display");
            phonetics.style.removeProperty("display");
            audio.style.removeProperty("display");
            wordEle.innerText = data[0].word;
            phonetics.innerText = data[0].phonetics[0].text;
            audio.src = data[0].phonetics[0].audio;
            wordMeaning.innerText = data[0].meanings[0].definitions[0].definition;
            const synonymsArray = data[0].meanings[0].definitions[0].synonyms;
            let synonymsData = "";
            if (synonymsArray.length) {
                for (let i = 0; i < synonymsArray.length; i++) {
                    synonymsData += `<p class="pills">${synonymsArray[i]}</p>`

                    //example
                    // data = data + 1;
                    // data += 1;
                }

            }
            else {
                synonymsData = `<p class="pills">No Synonyms Available</p>`;
            }
            document.querySelector(".synonyms").innerHTML = synonymsData;
        } else {
            audio.style.display = "none";
            wordEle.innerText = data.title;
            document.querySelectorAll(".wordmeaning")[0].style.display = "none";
            document.querySelectorAll(".wordmeaning")[1].style.display = "none";
            phonetics.style.display = "none";
            wordMeaning.innerText = data.message;
            document.querySelector(".synonyms").style.display = "none";
        }




    }
}
=======
const wrapper = document.querySelector(".wrapper"),
searchInput = wrapper.querySelector("input"),
volume = wrapper.querySelector(".word i"),
infoText = wrapper.querySelector(".info-text"),
synonyms = wrapper.querySelector(".synonyms .list"),
removeIcon = wrapper.querySelector(".search span");
let audio;

function data(result, word){
    if(result.title){
        infoText.innerHTML = `Can't find the meaning of <span>"${word}"</span>. Please, try to search for another word.`;
    }else{
        wrapper.classList.add("active");
        let definitions = result[0].meanings[0].definitions[0],
        phontetics = `${result[0].meanings[0].partOfSpeech}  /${result[0].phonetics[0].text}/`;
        document.querySelector(".word p").innerText = result[0].word;
        document.querySelector(".word span").innerText = phontetics;
        document.querySelector(".meaning span").innerText = definitions.definition;
        document.querySelector(".example span").innerText = definitions.example;
        audio = new Audio(result[0].phonetics[0].audio);

        if(definitions.synonyms[0] == undefined){
            synonyms.parentElement.style.display = "none";
        }else{
            synonyms.parentElement.style.display = "block";
            synonyms.innerHTML = "";
            for (let i = 0; i < 5; i++) {
                let tag = `<span onclick="search('${definitions.synonyms[i]}')">${definitions.synonyms[i]},</span>`;
                tag = i == 4 ? tag = `<span onclick="search('${definitions.synonyms[i]}')">${definitions.synonyms[4]}</span>` : tag;
                synonyms.insertAdjacentHTML("beforeend", tag);
            }
        }
    }
}

function search(word){
    fetchApi(word);
    searchInput.value = word;
}

function fetchApi(word){
    wrapper.classList.remove("active");
    infoText.style.color = "#000";
    infoText.innerHTML = `Searching the meaning of <span>"${word}"</span>`;
    let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    fetch(url).then(response => response.json()).then(result => data(result, word)).catch(() =>{
        infoText.innerHTML = `Can't find the meaning of <span>"${word}"</span>. Please, try to search for another word.`;
    });
}

searchInput.addEventListener("keyup", e =>{
    let word = e.target.value.replace(/\s+/g, ' ');
    if(e.key == "Enter" && word){
        fetchApi(word);
    }
});

volume.addEventListener("click", ()=>{
    volume.style.color = "#4D59FB";
    audio.play();
    setTimeout(() =>{
        volume.style.color = "#999";
    }, 800);
});

removeIcon.addEventListener("click", ()=>{
    searchInput.value = "";
    searchInput.focus();
    wrapper.classList.remove("active");
    infoText.style.color = "#9A9A9A";
    infoText.innerHTML = "Type any existing word and press enter to get meaning, example, synonyms, etc.";
});

const audi = document.getElementById('background-audio');
const audioToggle = document.getElementById('audio-toggle');

audioToggle.addEventListener('click', () => {
  if (audi.paused) {
    audi.play();
  } else {
    audi.pause();
  }
});
>>>>>>> 513fa2c (made few changes)
