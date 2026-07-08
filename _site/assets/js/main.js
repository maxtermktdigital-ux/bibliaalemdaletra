document.addEventListener("DOMContentLoaded", function() {
    const header = document.getElementById("smart-header");
    let lastScrollTop = 0;
    const threshold = 10; // Pixels mínimos para ativar a mudança

    window.addEventListener("scroll", function() {
        let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

        // Evita valores negativos (comum em rolagens elásticas de iOS)
        if (currentScroll < 0) currentScroll = 0;

        // Verifica se a rolagem passou do limite mínimo
        if (Math.abs(lastScrollTop - currentScroll) <= threshold) return;

        if (currentScroll > lastScrollTop && currentScroll > 70) {
            // Rolou para baixo - Esconde o Header
            header.classList.remove("scroll-up");
            header.classList.add("scroll-down");
        } else if (currentScroll < lastScrollTop) {
            // Rolou para cima - Mostra o Header
            header.classList.remove("scroll-down");
            header.classList.add("scroll-up");
        }

        lastScrollTop = currentScroll;
    }, { passive: true });
});

function loadGiscusComments() {
    const btnWrapper = document.getElementById('comments-trigger-wrapper');
    const container = document.getElementById('giscus-container');
    
    if (!container) return;

    // Remove o botão da tela para evitar cliques duplos
    if (btnWrapper) {
        btnWrapper.style.display = 'none';
    }

    // Detecta o tema atual do site para alinhar com o Giscus
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const giscusTheme = currentTheme === 'dark' ? 'dark_darkened' : 'light';

    // Cria o elemento script do Giscus dinamicamente
    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    
    // Configurações do Repositório (Altere estes atributos quando subir para o seu GitHub)
    script.setAttribute('data-repo', 'seu-usuario-github/nome-do-repositorio');
    script.setAttribute('data-repo-id', 'SEU_REPO_ID_AQUI');
    script.setAttribute('data-category', 'Announcements');
    script.setAttribute('data-category-id', 'SUA_CATEGORY_ID_AQUI');
    
    // Mapeamento e Identificação do Artigo
    script.setAttribute('data-mapping', 'pathname');
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'top');
    script.setAttribute('data-theme', giscusTheme);
    script.setAttribute('data-lang', 'pt');
    script.setAttribute('crossorigin', 'anonymous');
    script.async = true;

    // Injeta o script dentro do container dedicado
    container.appendChild(script);
}