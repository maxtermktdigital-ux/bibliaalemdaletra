document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("search-input");
    const searchResults = document.getElementById("search-results");
    const searchMeta = document.getElementById("search-meta");
    let searchIndex = [];

    // 1. Baixa o arquivo JSON de índice gerado pelo Jekyll
    fetch('/search.json')
        .then(response => response.json())
        .then(data => {
            searchIndex = data;
            // Se houver algum termo na URL (?q=termo), já executa a busca
            const urlParams = new URLSearchParams(window.location.search);
            const queryParam = urlParams.get('q');
            if (queryParam) {
                searchInput.value = queryParam;
                performSearch(queryParam);
            }
        })
        .catch(err => console.error("Erro ao carregar o índice de busca:", err));

    // Helper para remover acentos e caracteres especiais para busca precisa
    function slugify(text) {
        return text.toString().toLowerCase()
            .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // Remove acentos
            .trim();
    }

    // 2. Função principal de busca
    function performSearch(query) {
        searchResults.innerHTML = ""; // Limpa resultados anteriores
        const cleanQuery = slugify(query);

        if (cleanQuery.length < 2) {
            searchMeta.style.display = "none";
            return;
        }

        // Filtra os posts correspondentes
        const matches = searchIndex.filter(post => {
            return slugify(post.title).includes(cleanQuery) || 
                   slugify(post.excerpt).includes(cleanQuery) ||
                   (post.category && slugify(post.category).includes(cleanQuery));
        });

        // 3. Renderiza os resultados
        searchMeta.style.display = "block";
        searchMeta.textContent = `${matches.length} ${matches.length === 1 ? 'estudo encontrado' : 'estudos encontrados'}.`;

        if (matches.length === 0) {
            searchResults.innerHTML = `<p style="text-align:center; padding: 20px; color: var(--text-muted);">Nenhum estudo teológico corresponde à sua busca.</p>`;
            return;
        }

        matches.forEach(post => {
            const item = document.createElement("div");
            item.className = "search-result-item";
            item.innerHTML = `
                <div style="display:flex; justify-content:space-between; font-size:0.85rem; color:var(--text-muted); margin-bottom:5px;">
                    <span>${post.date}</span>
                    <span style="color:var(--color-secondary-copper); font-weight:600; text-transform:uppercase;">${post.category || ''}</span>
                </div>
                <h3 style="font-family:var(--font-heading); font-size:1.4rem; margin-bottom:8px;">
                    <a href="${post.url}" style="color:var(--text-main); text-decoration:none;">${post.title}</a>
                </h3>
                <p style="font-size:0.95rem; color:var(--text-muted); line-height:1.4; margin-bottom:10px;">${post.excerpt}</p>
                <a href="${post.url}" style="color:var(--color-primary-gold); text-decoration:none; font-size:0.9rem; font-weight:600;">Ler artigo completo →</a>
            `;
            searchResults.appendChild(item);
        });
    }

    // Escuta a digitação do usuário com um pequeno atraso (debounce) para suavidade
    let typingTimer;
    if (searchInput) {
        searchInput.addEventListener("input", function (e) {
            clearTimeout(typingTimer);
            typingTimer = setTimeout(() => {
                performSearch(e.target.value);
            }, 150);
        });
    }
});