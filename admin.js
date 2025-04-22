// admin.js e funcionario.js podem ter o mesmo código para logout
document.getElementById('logoutBtn').addEventListener('click', function() {
    // Redireciona para a página de login
    window.location.href = "login.html";
    
    // Em um sistema real, você também limparia a sessão/token aqui
});