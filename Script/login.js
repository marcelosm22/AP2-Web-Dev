document.addEventListener('DOMContentLoaded', function() {
    const senhaArmazenada = localStorage.getItem('password');

    if (!senhaArmazenada) {
        
        const novaSenha = prompt('Configure sua nova senha:');
        if (novaSenha) {
            const senhaHash = CryptoJS.SHA256(novaSenha).toString();
            localStorage.setItem('password', senhaHash);
            alert('Senha configurada com sucesso!');
        } else {
            alert('Configure sua senha para continuar.');
        }
    }

    document.getElementById('form-login').addEventListener('submit', function(event) {
        event.preventDefault();

        const password = document.getElementById('password').value;

        if (password) {
            const senhaHash = CryptoJS.SHA256(password).toString();

            if (senhaHash === localStorage.getItem('password')) {
                localStorage.setItem('sessionToken', 'loggedIn');
                window.location.href = 'home.html';
            } else {
                document.getElementById('mensagem-erro').innerText = 'Senha Incorreta';
            }
        } else {
            document.getElementById('mensagem-erro').innerText = 'Por favor, preencher campo de senha';
        }
    });
});