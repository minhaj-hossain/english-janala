const loadData = () => {
    const url = 'https://openapi.programming-hero.com/api/levels/all';

    fetch(url) 
        .then(res => res.json())
        .then(data => displayData(data.data));
}

const cardLoad= (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`

    fetch(url)
        .then(res => res.json())
        .then(data => displayCard(data.data))
}

const displayCard = (data) => {
    
    // console.log(data);

    const cardsContainer = document.querySelector('.cards-container');
    cardsContainer.innerHTML = '';

    data.forEach(card => {

        console.log(Object.keys(card).length);
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card bg-white shadow-sm rounded-xl p-14 text-center flex flex-col justify-between space-y-5 h-full">
            <div class="space-y-6 mb-14">
                        <h3 class="font-bold text-[32px]">${card.word}</h3>
                <p class="font-medium text-5">Meaning /Pronounciation</p>
                <div class="siliguri font-semibold text-[32px] text-[#18181b] opacity-[0.8]">"${card.meaning}" / ${card.pronunciation}"</div>

            </div>
            <div class="flex justify-between">
                <div class="w-10 h-10 bg-[rgba(26,145,255,0.1)] hover:bg-[rgba(26,145,255,0.5)] rounded-xl flex items-center justify-center">
                    <i class="fa-solid fa-circle-info"></i>
                </div>

                <div class="w-10 h-10 bg-[rgba(26,145,255,0.1)] hover:bg-[rgba(26,145,255,0.5)] rounded-xl flex items-center justify-center">
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
        <button onclick="cardLoad(${lesson.level_no})" class="btn btn-outline btn-primary"> <i class="fa-brands fa-leanpub"></i>Lesson - ${lesson.level_no}</button>
        `

        btnContainer.appendChild(div);
    })

}

loadData();