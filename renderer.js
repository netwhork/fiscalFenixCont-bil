const status = document.getElementById('status');

function executarScript(script) {
    status.textContent = `Executando ${script}...`;
    window.electronAPI.executarTeste(script)
        .then(resultado => {
            status.textContent = resultado;
        })
        .catch(error => {
            status.textContent = 'Erro: ' + error;
        });
}
