document.getElementById('togglePassword').addEventListener('click', function (e) {
    const password = document.getElementById('password');
    if (password.type === 'password') {
      password.type = 'text';
      this.textContent = 'Hide';
    } else {
      password.type = 'password';
      this.textContent = 'Show';
    }
  });