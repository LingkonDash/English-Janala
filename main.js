// Variables 
const lessons = document.getElementById('lessons');
const lessonWords = document.getElementById('lesson-Words')

const defaultSection = document.getElementById('default-section');

// Lesson Loader 
async function loadLessons() {

  const url = 'https://openapi.programming-hero.com/api/levels/all'
  const res = await fetch(url)
  const json = await res.json();

  createLessonBTN(json.data);



}
loadLessons();


async function loadWords(level) {
  

  const url = `https://openapi.programming-hero.com/api/level/${level}`
  const res = await fetch(url)
  const json = await res.json();


  createWords(json.data);

}

// active routing in buttons
lessons.addEventListener('click', (e) => {
  const buttons = e.target.closest('#lessons').children
  
  for(let button of buttons) {
    
    button.classList.remove('btn-Style');
    
  } 
  e.target.closest('.butt').classList.add('btn-Style')
  
})

// Lesson Button Creator 
function createLessonBTN(arr) {

  arr.forEach(obj => {
    const btn = document.createElement('button');
    btn.className = 'btn btn-outline btn-primary butt'
    btn.onclick = () => loadWords(obj.level_no);
    btn.innerHTML = `<i class="fa-solid fa-book-open"></i> Lesson -${obj.level_no}`
    lessons.appendChild(btn)
  });
}

// Word Div creator
function createWords(arr) {

  lessonWords.classList.add('grid');
  lessonWords.classList.remove('hidden');
  lessonWords.innerHTML = ''

  if(arr.length === 0) {
    div = document.createElement('div');
    div.className = 'col-span-3 py-[64px] px-5 flex flex-col justify-center items-center text-center rounded-[24px] bg-secondary-bg space-y-3'
    div.innerHTML = `
      <img src="assets/alert-error.png" alt="Alert">
      <p class="text-secondary-text font-shiliguri text-xs">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
      <h2 class="font-semibold font-shiliguri text-4xl ">নেক্সট Lesson এ যান</h2>
    `
    lessonWords.appendChild(div)
  }

  arr.forEach(obj => {

    div = document.createElement('div');
    div.className = 'bg-words-bg rounded-[12px] text-center space-y-4 p-10'
    div.innerHTML = `
      <h2 class="font-semibold text-2xl">${obj.word}</h2>
      <p class="font-medium text-xl">Meaning /Pronounciation</p>
      <h2 class="font-semibold text-2xl font-font-shiliguri">"${obj.meaning} / ${obj.pronunciation}"</h2>
      <div class="flex justify-between items-center mt-15">
        <button class="cursor-pointer bg-[#1A91FF10] p-4 rounded-[8px]"><i class="fa-solid fa-circle-info"></i></button>
        <button class="cursor-pointer bg-[#1A91FF10] p-4 rounded-[8px]"><i class="fa-solid fa-volume-high"></i></button>
      </div>
    `
    lessonWords.appendChild(div)

  })

  defaultSection.classList.add('hidden')
}

// Drop Down meny in mobile view 
function dorpDownMenu() {
  const items = document.getElementById('dropDown-menu');

  items.classList.toggle('hidden')
}