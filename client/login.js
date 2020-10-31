// @ts-nocheck
const loginForm = document.querySelector('.login-form');
const button = document.querySelector('.login-btn');

loginForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const data = { email, password };
  console.log(data);

  fetch('http://localhost:3000/user/login', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('success:', data);
      if (data.token) {
        toastr.success('Logged In');
        window.location.href = 'index.html';
      } else {
        toastr.error('Wrong Credentials. Please try again');
        toastr.options.closeButton = true;
      }
    })
    .catch((error) => {
      console.log('Error:', error);
    });
});
