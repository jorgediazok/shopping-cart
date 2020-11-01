// @ts-nocheck
const signupForm = document.querySelector('.signup-form');

signupForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const data = { email, password };
  console.log(data);

  fetch('https://gaming-shoppingcart.herokuapp.com/user/signup', {
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
