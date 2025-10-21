
// simple scroll reveal
document.addEventListener('DOMContentLoaded', function(){
  const els = document.querySelectorAll('.services, .contact-block');
  const obs = new IntersectionObserver((entries)=>{
    entries.forEach(ent=>{
      if(ent.isIntersecting) ent.target.style.opacity=1;
    })
  }, {threshold: 0.15});
  els.forEach(el=>{el.style.opacity=0;obs.observe(el)})
});
