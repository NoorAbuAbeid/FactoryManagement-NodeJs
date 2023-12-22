const logoutButton = document.getElementById('logout');
logoutButton.addEventListener('click', async () => {
    try {
        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('fullName');
        window.location.href = 'LoginPage.html'; // Redirect to the login page
        alert('You have been successfully logged out');

    } catch (error) {
        console.error('Error during logout:', error);
    }
});
