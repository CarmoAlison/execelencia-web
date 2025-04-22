document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');
    
    // Credenciais do ADMIN
    const adminUsername = "ExcelenciaADMIN";
    const adminPassword = "Excelencia.web$";
    
    // Credenciais do Funcionário
    const funcionarioUsername = "Excelencia";
    const funcionarioPassword = "Excelencia.web";
    
    // Limpa mensagens de erro anteriores
    errorMessage.style.display = 'none';
    
    // Validação
    if (username === adminUsername && password === adminPassword) {
        // Redireciona para área do admin
        window.location.href = "admin.html";
    } 
    else if (username === funcionarioUsername && password === funcionarioPassword) {
        // Redireciona para área do funcionário
        window.location.href = "funcionario.html";
    } 
    else {
        // Exibe mensagem de erro
        errorMessage.textContent = "Usuário ou senha incorretos!";
        errorMessage.style.display = 'block';
    }
});