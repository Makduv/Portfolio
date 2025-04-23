document.addEventListener("DOMContentLoaded", () => {
    injectHeader();
    injectFooter();
    initTimelineAnimation();
});
  
/* Injecte le header HTML et initialise le burger menu */
function injectHeader() {
fetch("header.html")
    .then(res => res.text())
    .then(html => {
        document.getElementById("header").innerHTML = html;
        initBurgerMenu(); // Appelé après l'injection
    });
}

/* Injecte le footer HTML */
function injectFooter() {
    fetch("footer.html")
        .then(res => res.text())
        .then(html => {
            document.getElementById("footer").innerHTML = html;
        });
}

/* Active le menu burger sur mobile */
function initBurgerMenu() {
    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            navLinks.classList.toggle("active");
        });
    }
}

/* Ajoute l'animation de scroll sur la timeline */
function initTimelineAnimation() {
    const timelineItems = document.querySelectorAll(".timeline-item");

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                }
            });
        },
    {
        threshold: 0.1
    }
    );

    timelineItems.forEach(item => observer.observe(item));
}
