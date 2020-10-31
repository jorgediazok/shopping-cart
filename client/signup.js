// @ts-nocheck
const signupForm = document.querySelector('.signup-form');

signupForm.addEventListener('submit', function (e) {
  e.preventDefault();
  // @ts-ignore
  const email = document.getElementById('email').value;
  // @ts-ignore
  const password = document.getElementById('password').value;

  const data = { email, password };
  console.log(data);

  fetch('http://localhost:3000/user/signup', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Success:', data);
      if (data.message == 'User Created') {
        // @ts-ignore
        signupForm.reset();
        toastr.success('User Created. Please Login.');
        toastr.options = {
          onHidden: function () {
            window.location.href = 'index.html';
          },
        };
      } else {
        // @ts-ignore
        toastr.error('Invalid User');
        toastr.options.closeButton = true;
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
});
