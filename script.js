// script.js
document.addEventListener('DOMContentLoaded', function(){
  // Load reviews.json
  fetch('reviews.json').then(r=>r.json()).then(data=>{
    const slider = document.getElementById('slider');
    data.forEach((item, idx)=>{
      const slide = document.createElement('div');
      slide.className = 'slide' + (idx===0 ? ' show':'');
      slide.innerHTML = `<div class="text">“${item.text}”<div class="name">— ${item.name}</div></div>`;
      slider.appendChild(slide);
    });
    initSlider();
  }).catch(err=>{
    console.warn('No reviews.json found or failed to load', err);
  });

  // slider controls
  function initSlider(){
    const slides = Array.from(document.querySelectorAll('.slide'));
    if(slides.length===0) return;
    let cur = 0;
    const show = i=>{
      slides.forEach((s,idx)=>{
        s.classList.toggle('show', idx===i);
      });
    };
    document.getElementById('prev').addEventListener('click', ()=>{
      cur = (cur-1+slides.length)%slides.length; show(cur);
    });
    document.getElementById('next').addEventListener('click', ()=>{
      cur = (cur+1)%slides.length; show(cur);
    });
    // auto
    setInterval(()=>{ cur=(cur+1)%slides.length; show(cur); }, 4200);

    // allow swipe on mobile
    let startX = null;
    const sliderEl = document.getElementById('slider');
    sliderEl.addEventListener('touchstart', e=> startX = e.touches[0].clientX);
    sliderEl.addEventListener('touchend', e=>{
      if(startX===null) return;
      let dx = e.changedTouches[0].clientX - startX;
      if(Math.abs(dx)>40){
        if(dx<0) cur=(cur+1)%slides.length; else cur=(cur-1+slides.length)%slides.length;
        show(cur);
      }
      startX = null;
    });
  }

  // animations on scroll
  const observer = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
      }
    });
  }, {threshold:0.15});
  document.querySelectorAll('.animate').forEach(el=>observer.observe(el));

});
