// script.js — плавна анімація, меню, форма -> Viber, top button, плавна прокрутка

document.addEventListener('DOMContentLoaded', function () {
  // reveal animation
  const fades = document.querySelectorAll('.fade-up');
  setTimeout(() => fades.forEach(el => el.classList.add('visible')), 120);

  // mobile menu toggle
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  toggle && toggle.addEventListener('click', () => {
    nav.style.display = (nav.style.display === 'flex') ? 'none' : 'flex';
  });

  // smooth scroll for nav links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', function(e){
      const href = this.getAttribute('href');
      if(href.startsWith('#')){
        e.preventDefault();
        const target = document.querySelector(href);
        if(target){
          target.scrollIntoView({behavior:'smooth',block:'start'});
        }
      }
    });
  });

  // top button
  const topBtn = document.getElementById('topBtn');
  window.addEventListener('scroll', () => {
    if(window.scrollY > 300) topBtn.style.display = 'block';
    else topBtn.style.display = 'none';
  });
  topBtn.addEventListener('click', ()=> window.scrollTo({top:0,behavior:'smooth'}));
});

/**
 * sendToViber(event)
 * При натисканні на кнопку форми — відкриває Viber в НОВОМУ вікні з твоєю invite-ссилкою.
 * Також показує коротке повідомлення на сторінці "Заявку відправлено".
 */
function sendToViber(e){
  e.preventDefault();
  const name = document.getElementById('userName').value.trim();
  const phone = document.getElementById('userPhone').value.trim();
  const to = document.getElementById('userTo').value.trim();
  const from = document.getElementById('userFrom').value.trim();
  const message = document.getElementById('userMessage').value.trim();

  // Open Viber invite in new tab (works on all devices)
  const webInvite = 'https://invite.viber.com/?g2=AQBXevxDf8qvr02hycsyOLunLh6dSXHJH8Uc01hOaeafmSe78OVyRIGzq9GeNQBb';
  window.open(webInvite, '_blank');

  // Show confirmation message on the page
  const notice = document.getElementById('formNotice');
  notice.innerText = '✅ Заявку відправлено — зв\'яжемось з вами у Viber!';
  notice.style.display = 'block';

  // Optionally clear form
  document.getElementById('leadForm').reset();
  return false;
}
