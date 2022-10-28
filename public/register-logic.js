function comparePwd(e) {
    const password = document.querySelector('#password');
    const confirmPassword = document.querySelector('#confirm-password');

    if (confirmPassword.value) {
        if (password.value != confirmPassword) {
            e.preventDefault()
            return false;
        }
    }
}