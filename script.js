// Simple book form handler - opens Viber link with message (client-side)
document.addEventListener('DOMContentLoaded', function(){
  var form = document.getElementById('bookForm');
  form.addEventListener('submit', function(e){
    e.preventDefault();
    var name = form.name.value.trim();
    var phone = form.phone.value.trim();
    var route = form.route.value;
    // craft message for viber/telegram/whatsapp
    var text = encodeURIComponent('Бронювання\n' + 'Ім\'я: ' + name + '\nТелефон: ' + phone + '\nНапрямок: ' + route);
    // open viber if available else use tel: as fallback
    var viber = 'viber://chat?number=%2B380689234960&text=' + text;
    var whatsapp = 'https://wa.me/380689234960?text=' + text;
    // try opening viber first
    window.open(viber);
    setTimeout(function(){ window.open(whatsapp); }, 800);
    alert('Дякуємо! Ми надішлемо підтвердження у Viber/WhatsApp.');
    form.reset();
  });
});