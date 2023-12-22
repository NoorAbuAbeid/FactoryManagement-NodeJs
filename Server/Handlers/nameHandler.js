
// Function to retrieve the user's full name from session storage
const getFullName = () => {
    return sessionStorage.getItem('fullName');
};

// Function to update the full name element on the page
const updateFullNameElement = () => {
    const fullNameElement = document.getElementById('full-name');
    const fullName = getFullName();
    fullNameElement.textContent = `Welcome, ${fullName}!`;


};
// Call the updateFullNameElement function when the page loads
window.addEventListener('load', updateFullNameElement);
