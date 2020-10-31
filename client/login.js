// @ts-nocheck
const loginForm = document.querySelector('.login-form');

//Save user

let currentUser = null;

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
        const user = email;
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          toastr.success('Logged In');
          window.location.href = 'index.html';
        }
      } else {
        toastr.error('Wrong Credentials. Please try again');
        loginForm.reset();
        toastr.options.closeButton = true;
      }
    })
    .catch((error) => {
      console.log('Error:', error);
    });
});
