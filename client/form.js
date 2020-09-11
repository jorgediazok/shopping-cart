const toggle = document.querySelector('.nav-burger');

toggle.addEventListener('click', function () {
  document.getElementById('sidebar').classList.toggle('active');
});
