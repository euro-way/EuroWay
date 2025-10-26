
// Simple reviews stored in localStorage
const reviewsKey = 'euroway_reviews_v2';

function defaultReviews(){
  return [
    {name:'Олександр', text:'Комфортна поїздка, рекомендую.'},
    {name:'Марія', text:'Все швидко та зручно.'}
  ];
}

function loadReviews(){
  try{
    const raw = localStorage.getItem(reviewsKey);
    return raw ? JSON.parse(raw) : defaultReviews();
  }catch(e){
    return defaultReviews();
  }
}

function saveReviews(revs){
  localStorage.setItem(reviewsKey, JSON.stringify(revs));
}

function renderPreview(){
  const dest = document.getElementById('reviews-preview');
  if(!dest) return;
  const revs = loadReviews();
  dest.innerHTML = '';
  revs.slice().reverse().slice(0,3).forEach(r=>{
    const el = document.createElement('div');
    el.className = 'review';
    el.innerHTML = `<strong>${r.name}</strong><div class="rtext">${r.text}</div>`;
    dest.appendChild(el);
  });
}

function renderAll(){
  const dest = document.getElementById('reviews-list');
  if(!dest) return;
  const revs = loadReviews();
  dest.innerHTML = '';
  revs.slice().reverse().forEach(r=>{
    const el = document.createElement('div');
    el.className = 'review';
    el.innerHTML = `<strong>${r.name}</strong><div class="rtext">${r.text}</div>`;
    dest.appendChild(el);
  });
}

document.addEventListener('DOMContentLoaded', function(){
  renderPreview();
  renderAll && renderAll();
  const form = document.getElementById('review-form');
  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      const name = document.getElementById('r-name').value.trim();
      const text = document.getElementById('r-text').value.trim();
      if(!name || !text) return alert('Будь ласка, заповніть поля.');
      const revs = loadReviews();
      revs.push({name, text});
      saveReviews(revs);
      alert('Дякуємо за відгук!');
      if(typeof renderAll === 'function') renderAll();
      if(typeof renderPreview === 'function') renderPreview();
      form.reset();
    });
  }
});
