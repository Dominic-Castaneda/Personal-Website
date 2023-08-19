document.addEventListener("DOMContentLoaded", function() {
  const navbarContainer = document.getElementById("navbarContainer");

  fetch("../navbar.html")
    .then(response => response.text())
    .then(data => {
      navbarContainer.innerHTML = data;
      // Call the identity handlers initialization after loading the navbar
      initializeIdentityHandlers();
    });
});