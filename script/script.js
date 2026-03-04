const synonymBtn = (arr) => {
    const synonymBtn = arr.map(btn => ` <button class="btn btn-outline btn-primary text-2xl opacity-[0.8]">${btn}</button>`)


    return synonymBtn.join(' ');
}

function pronounceWord(word) {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = "en-EN"; // English
    window.speechSynthesis.speak(utterance);
}

const loadData = () => {
    const url = 'https://openapi.programming-hero.com/api/levels/all';

    fetch(url)
        .then(res => res.json())
        .then(data => displayData(data.data));
}

loadData();

const removeActive = () => {
    const allBtn = document.querySelectorAll('.lesson-btn-all');

    allBtn.forEach(btn => {
        btn.classList.remove('active');
    })
}

const cardLoad = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`

    fetch(url)
        .then(res => res.json())
        .then(data => {


            const activeBtn = document.querySelector(`#lesson-${id}`);

            removeActive();
            activeBtn.classList.add('active');

            displayCard(data.data)
        })
}

const loadWordDetails = async (id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`;

    const res = await fetch(url);
    const data = await res.json();

    displayWordDetails(data.data);

}




displayWordDetails = (data) => {

    console.log(data);

    const modalContainer = document.getElementById('modal-container');
    modalContainer.innerHTML = ` 
    
                    <div class="font-semibold text-4xl">
                        <h3  class="siliguri">${data.word} <i onclick="pronounceWord('${data.word}')" class="fa-solid fa-microphone-lines"></i> ${data.pronunciation ? data.pronunciation : 'Pronunciation not available'}</h3>

                    </div>


                    <div class="text-2xl">
                        <h5 class="font-semibold">Meaning</h5>
                        <p class="siliguri font-medium">${data.meaning ? data.meaning : 'Meaning not available'}</p>
                    </div>

                    <div class="text-2xl">
                        <h5 class="font-semibold">Example</h5>
                        <p class="opacity-[0.8]">${data.sentence ? data.sentence : 'Example not available'}</p>
                    </div>

                    <div>
                        <h5 class="font-medium text-2xl siliguri">সমার্থক শব্দ গুলো</h5>

                        <div >

                            ${synonymBtn(data.synonyms)}

                        </div>

                        <button class="btn btn-primary mt-8">Complete Learning</button>
     

                    </div>`


    document.getElementById('word_modal').showModal();

}

const displayCard = (data) => {

    const cardsContainer = document.querySelector('.cards-container');
    cardsContainer.innerHTML = '';

    if (data.length === 0) {
        cardsContainer.innerHTML = `
        <div class=" col-span-3 flex items-center justify-center flex-col space-y-4 p-10 rounded-2xl">

                <img src="./assets/alert-error.png" alt="not found">
                <p  class="siliguri text-[13px] text-[#79716b]">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                <h3 class="siliguri font-medium text-[34px]">নেক্সট Lesson এ যান</h3>

        </div>
        
        `
        return;
    }



    data.forEach(card => {


        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card bg-white shadow-sm rounded-xl p-14 text-center flex flex-col justify-between space-y-5 h-full">
            <div class="space-y-6 mb-14">
                        <h3 class="font-bold text-[32px]">${card.word ? card.word : 'শব্দ পাওয়া যায়নি'}</h3>
                <p class="font-medium text-5">Meaning /Pronounciation</p>
                 <div class="siliguri font-semibold text-[32px] text-[#18181b] opacity-[0.8]">"${card.meaning ? card.meaning : 'অর্থ পাওয়া যায়নি'}" / ${card.pronunciation ? card.pronunciation : 'উচ্চারণ পাওয়া যায়নি'}</div>

            </div>
            <div class="flex justify-between">
                <div onclick="loadWordDetails('${card.id}')" class="w-10 h-10 bg-[rgba(26,145,255,0.1)] hover:bg-[rgba(26,145,255,0.5)] rounded-xl flex items-center justify-center">
                    <i class="fa-solid fa-circle-info"></i>
                </div>

                <div onclick="pronounceWord('${card.word}')" class="w-10 h-10 bg-[rgba(26,145,255,0.1)] hover:bg-[rgba(26,145,255,0.5)] rounded-xl flex items-center justify-center">
                    <i class="fa-solid fa-volume-high"></i>
                </div>
            </div>
        </div>
        `

        cardsContainer.appendChild(div);
    })

}


// display all btns 
const displayData = (lessons) => {
    // console.log(lessons);
    const btnContainer = document.querySelector('.btnContainer');
    btnContainer.innerHTML = '';

    lessons.forEach(lesson => {

        // console.log(lesson)
        const div = document.createElement('div');

        div.innerHTML = `
        <button id="lesson-${lesson.level_no}" onclick="cardLoad(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn-all"> <i class="fa-brands fa-leanpub"></i>Lesson - ${lesson.level_no}</button>
        `

        btnContainer.appendChild(div);
    })

}
