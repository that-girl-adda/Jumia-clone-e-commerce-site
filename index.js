function saveEmail(event) {
  event.preventDefault(); // stop normal form submit
  const email = document.getElementById("user-contact").value;
  localStorage.setItem("userEmail", email);
  window.location.href = "password.html"; // go to next page
}