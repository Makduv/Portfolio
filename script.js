document.addEventListener("DOMContentLoaded", () => {
    injectHeader();
    injectFooter();
    initTimelineAnimation();
    filtreProjets();
    masonryProject();

    if (window.innerWidth <= 768) {
        // Code spécial pour mobile
        setupVoirPlus("#projets", "#projets .projet", "#voir-plus", 3, 3, resizeMasonryItems);
        setupVoirPlus(".bb-container", ".bb-container .bb-item", "#bb-voir-plus", 4, 2);
        setupVoirPlus(".tp-container", ".tp-container .tp-item", "#tp-voir-plus", 4, 2);
        setupVoirPlus(".formations-container", ".formations-container .formations-item", "#formations-voir-plus", 2, 2);
        setupVoirPlus(".certifs-container", ".certifs-container .certifs-item", "#certifs-voir-plus", 2, 2);
        setupVoirPlus(".skills-list", ".skills-list li", "#techniques-voir-plus",12,6);
        setupVoirPlus(".bibliography",".bibliography .reference","#book-voir-plus",2,2);
        } else {
        // Code spécial pour desktop
        setupVoirPlus("#projets", "#projets .projet", "#voir-plus", 6, 6, resizeMasonryItems);
        setupVoirPlus(".bb-container", ".bb-container .bb-item", "#bb-voir-plus", 6, 6);
        setupVoirPlus(".tp-container", ".tp-container .tp-item", "#tp-voir-plus", 5, 5);
        setupVoirPlus(".formations-container", ".formations-container .formations-item", "#formations-voir-plus", 2, 2);
        setupVoirPlus(".certifs-container", ".certifs-container .certifs-item", "#certifs-voir-plus", 4, 4);
        setupVoirPlus(".skills-list", ".skills-list li", "#techniques-voir-plus",15,5);
        setupVoirPlus(".bibliography",".bibliography .reference","#book-voir-plus",4,2);
    }
    
    initCertificationsZoom();
    
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

//Filtre les projets selon leur sous-catégories dans le masonry
function filtreProjets(){
    const filterButtons = document.querySelectorAll(".filtres button");
    const projets = document.querySelectorAll(".projet");

    filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
        document.querySelector(".filtres button.active")?.classList.remove("active");
        btn.classList.add("active");

        const filtre = btn.getAttribute("data-filtre");

        projets.forEach((projet) => {
        const categorie = projet.getAttribute("data-categorie");

        if (filtre === "all" || categorie === filtre) {
            projet.style.display = "block";
        } else {
            projet.style.display = "none";
        }
        });
    });
    });

}
  
  //Calcule la taille pour leffet masonry de la partie projet
  function resizeMasonryItems() {
    const grid = document.querySelector('.projets');
    const rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
    const rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('gap'));
    const items = grid.querySelectorAll('.projet');
  
    items.forEach(item => {
      const content = item.querySelector('img');
      const itemHeight = item.getBoundingClientRect().height;
      const rowSpan = Math.ceil((itemHeight + rowGap) / (rowHeight + rowGap));
      item.style.gridRowEnd = `span ${rowSpan}`;
    });
  }
  
  function masonryProject() {
    window.addEventListener('load', resizeMasonryItems);
    window.addEventListener('resize', resizeMasonryItems);
  }
  
  //Bouton "voir plus/ voir moins"
  function setupVoirPlus(containerSelector, itemSelector, buttonSelector, nombreInitial = 6, increment = 6, afterAfficher = null) {
    const container = document.querySelector(containerSelector);
    const items = document.querySelectorAll(itemSelector);
    const button = document.querySelector(buttonSelector);

    if (!container || !items.length || !button) return;

    let visibleCount = nombreInitial;

    function afficherItems() {
        items.forEach((item, i) => {
            item.style.display = i < visibleCount ? "block" : "none";
        });

        if (items.length <= nombreInitial) {
            button.style.display = "none";
        } else {
            button.style.display = "inline-block";
            button.textContent = (visibleCount >= items.length) ? "VOIR MOINS" : "VOIR PLUS";
        }

        if (afterAfficher && typeof afterAfficher === "function") {
            afterAfficher();
        }
    }

    button.addEventListener("click", () => {
        if (visibleCount < items.length) {
            visibleCount += increment;
        } else {
            visibleCount = nombreInitial;
        }
        afficherItems();
    });

    afficherItems();
}

function initCertificationsZoom() {
    const modal = document.getElementById("zoom-modal");
    const zoomedImg = document.querySelector(".zoomed-image");
    const closeZoom = document.querySelector(".close-zoom");
  
    if (!modal || !zoomedImg || !closeZoom) return; // Sécurité si jamais les éléments n'existent pas
  
    document.querySelectorAll(".certifs-item img").forEach(img => {
      img.addEventListener("click", () => {
        zoomedImg.src = img.src;
        modal.style.display = "flex";
      });
    });
  
    closeZoom.addEventListener("click", () => {
      modal.style.display = "none";
      zoomedImg.src = "";
    });
  
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
        zoomedImg.src = "";
      }
    });
  }
  

