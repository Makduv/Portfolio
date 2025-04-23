document.addEventListener("DOMContentLoaded", () => {
    // Injecte le header
    fetch("header.html")
      .then(response => response.text())
      .then(data => {
        document.getElementById("header").innerHTML = data;
  
        // ⚠️ Re-initialiser les éléments JS après injection du header
        const menuToggle = document.getElementById("menu-toggle");
        const navLinks = document.querySelector(".nav-links");
  
        if (menuToggle && navLinks) {
          menuToggle.addEventListener("click", () => {
            navLinks.classList.toggle("active");
          });
        }
      });
  
});
  