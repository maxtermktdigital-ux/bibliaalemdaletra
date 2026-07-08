(function () {
    // 1. Verifica se há uma escolha salva no navegador
    const savedTheme = localStorage.getItem('theme');
    
    // 2. Verifica a preferência do Sistema Operacional (Windows/Android/iOS)
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // 3. Define o tema inicial baseado nas regras acima
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
    }
})();

// Função global que será acionada pelo botão do menu
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    let newTheme = 'light';
    
    if (currentTheme === 'light') {
        newTheme = 'dark';
    }
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}