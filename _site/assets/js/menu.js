document.addEventListener("DOMContentLoaded", function () {
    const menuOpenBtn = document.getElementById("menu-open-btn");
    const menuCloseBtn = document.getElementById("menu-close-btn");
    const navMenu = document.getElementById("nav-menu");
    const menuOverlay = document.getElementById("menu-overlay");

    function openMenu() {
        navMenu.classList.add("is-active");
        menuOverlay.classList.add("is-active");
        document.body.style.overflow = "hidden"; // Bloqueia scroll do fundo
    }

    function closeMenu() {
        navMenu.classList.remove("is-active");
        menuOverlay.classList.remove("is-active");
        document.body.style.overflow = ""; // Libera scroll do fundo
    }

    // Ouvintes de eventos
    if (menuOpenBtn) menuOpenBtn.addEventListener("click", openMenu);
    if (menuCloseBtn) menuCloseBtn.addEventListener("click", closeMenu);
    if (menuOverlay) menuOverlay.addEventListener("click", closeMenu);
});