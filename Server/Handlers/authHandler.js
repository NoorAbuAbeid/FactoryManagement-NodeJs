function checkAccessToken() {
    const accessToken = sessionStorage['accessToken'];

    if (!accessToken) {
        alert('You have to login first!!!')
        // Redirect to the login page or handle unauthorized access
        window.location.href = 'LoginPage.html';
        return false; // Indicate that authentication failed
    }

    return accessToken; // Return the access token if it's available
}
