function saveEmail(event) {
  event.preventDefault(); // stop normal form submit
  const email = document.getElementById("user-contact").value;
  localStorage.setItem("userEmail", email);
  window.location.href = "password.html"; // go to next page
}

const emailInput = document.querySelector('input[type="email"]');
const continueBtn = document.querySelector('#continue-btn'); // Use your button's ID

continueBtn.addEventListener('click', () => {
    const userEmail = emailInput.value;
    if (userEmail) {
        localStorage.setItem('userEmail', userEmail);
        window.location.href = 'password.html'; // Move to the password page
    }
});