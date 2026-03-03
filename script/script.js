const loadData = () => {
    const url = 'https://openapi.programming-hero.com/api/levels/all';

    fetch(url) 
        .then(res => res.json())
        .then(data => displayData(data.data));
}

const displayData = (lessons) => {
    // console.log(lessons);
    const btnContainer = document.querySelector('.btnContainer');
    btnContainer.innerHTML = '';

    lessons.forEach(lesson => {
        const div = document.createElement('div');

        div.innerHTML = `
        <button class="btn btn-outline btn-primary"> <i class="fa-brands fa-leanpub"></i>Learn - ${lesson.level_no}</button>
        `

        btnContainer.appendChild(div);
    })

}

loadData();