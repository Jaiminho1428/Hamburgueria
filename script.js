function pedir(button) {
    const card = button.closest('.cartaoOferta');
    if (!card) {
        window.location.href = 'formulario.html';
        return;
    }
    const nome = (card.querySelector('h3') || {innerText: ''}).innerText.trim();
    const descricao = (card.querySelector('.descricao') || {innerText: ''}).innerText.trim();
    const preco = (card.querySelector('.preco') || {innerText: ''}).innerText.trim();

    const params = new URLSearchParams();
    if (nome) params.set('nomeProduto', nome);
    if (descricao) params.set('descricao', descricao);
    if (preco) params.set('preco', preco);

    window.location.href = 'formulario.html?' + params.toString();
}

function mostrarToast(mensagem, tipo = 'erro') {
    const toast = document.createElement('div');
    toast.className = `toast-${tipo}`;
    toast.textContent = mensagem;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

document.addEventListener('DOMContentLoaded', function () {
    if (!document.getElementById('pedidoForm')) return;

    const params = new URLSearchParams(window.location.search);
    const nomeProduto = params.get('nomeProduto') || '';
    const descricao = params.get('descricao') || '';
    const preco = params.get('preco') || '';

    if (nomeProduto) {
        document.getElementById('produtoNome').innerText = nomeProduto;
        document.getElementById('produtoHidden').value = nomeProduto;
    }
    if (descricao) {
        document.getElementById('produtoDesc').innerText = descricao;
        const pedidoTextarea = document.getElementById('pedido');
        if (pedidoTextarea && !pedidoTextarea.value) {
            pedidoTextarea.value = `Produto: ${nomeProduto}\nDescrição: ${descricao}`;
        }
    }
    if (preco) {
        document.getElementById('produtoPreco').innerText = preco;
        document.getElementById('precoHidden').value = preco;
    }

    const form = document.getElementById('pedidoForm');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            const toast = document.createElement('div');
            toast.className = 'pedido-toast';
            toast.textContent = 'Pedido enviado com sucesso — redirecionando ao cardápio...';
            document.body.appendChild(toast);

            setTimeout(() => {
                toast.style.opacity = '0';
                setTimeout(() => {
                    toast.remove();
                    window.location.href = 'cardapio.html';
                }, 350);
            }, 1100);
        });
    }

    preencherFormularioPedido();
});

const cadastroForm = document.getElementById("cadastroForm");
if (cadastroForm) {
    cadastroForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const senha = document.getElementById("senha").value;
        const confirmaSenha = document.getElementById("confirmaSenha").value;

        if (senha !== confirmaSenha) {
            mostrarToast('As senhas não conferem!');
            return;
        }

        const usuario = {
            nome: document.getElementById("nome").value,
            email: document.getElementById("email").value,
            telefone: document.getElementById("telefone").value,
            senha: senha,
            endereco: document.getElementById("endereco").value,
            cep: document.getElementById("cep").value,
            bairro: document.getElementById("bairro").value,
            numero: document.getElementById("numero").value,
            complemento: document.getElementById("complemento").value,
            referencia: document.getElementById("referencia").value
        };

        localStorage.setItem("usuarioCadastrado", "true");
        localStorage.setItem("usuarioData", JSON.stringify(usuario));
        localStorage.setItem("usuario", JSON.stringify(usuario));

        window.location.href = "cardapio.html";
    });
}

function migrateOldUser() {
    const oldRaw = localStorage.getItem("usuario");
    const current = localStorage.getItem("usuarioData");
    if (oldRaw && !current) {
        try {
            const parsed = JSON.parse(oldRaw);
            if (parsed && typeof parsed === 'object' && parsed.email) {
                localStorage.setItem("usuarioData", JSON.stringify(parsed));
            }
        } catch (err) {
            
        }
    }
}
migrateOldUser();

const loginForm = document.getElementById("loginForm");
if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const login = (document.getElementById("login").value || '').trim();
        const senha = (document.getElementById("loginSenha").value || '').trim();

        let usuarioSalvo = null;
        try {
            usuarioSalvo = JSON.parse(localStorage.getItem("usuarioData"));
        } catch (err) {
            usuarioSalvo = null;
        }
        if (!usuarioSalvo) {
            try {
                usuarioSalvo = JSON.parse(localStorage.getItem("usuario"));
            } catch (err) {
                usuarioSalvo = null;
            }
        }

        if (!usuarioSalvo) {
            mostrarToast('Nenhuma conta cadastrada! Crie uma nova conta.');
            return;
        }

        const emailSaved = (usuarioSalvo.email || '').toString().trim();
        const telefoneSaved = (usuarioSalvo.telefone || '').toString().trim();
        const senhaSaved = (usuarioSalvo.senha || '').toString().trim();

        if (
            (login === emailSaved || login === telefoneSaved) &&
            senha === senhaSaved
        ) {
            localStorage.setItem("usuarioCadastrado", "true");
            window.location.href = "cardapio.html";
        } else {
            mostrarToast('E-mail, telefone ou senha incorretos!');
            document.getElementById("login").value = "";
            document.getElementById("loginSenha").value = "";
        }
    });
}

function preencherFormularioPedido() {
    const usuarioData = JSON.parse(localStorage.getItem("usuarioData"));
    if (!usuarioData) return;

    const ids = [
        "nome", "email", "telefone",
        "endereco", "cep", "bairro",
        "numero", "complemento", "referencia"
    ];

    ids.forEach(id => {
        let campo = document.getElementById(id);
        if (campo) campo.value = usuarioData[id] || "";
    });
}

function verificarAutenticacao() {
    const usuarioCadastrado = localStorage.getItem('usuarioCadastrado');
    
    if (!usuarioCadastrado) {
        window.location.href = "login.html";
        return false;
    }
    return true;
}

function exibirLinksAutenticados() {
    const linkPerfil = document.getElementById('linkPerfil');
    const linkPerfilCardapio = document.getElementById('linkPerfilCardapio');
    const sair = document.getElementById('sair');
    const sairCardapio = document.getElementById('sairCardapio');

    if (linkPerfil) {
        linkPerfil.style.display = 'inline-block';
    }
    if (linkPerfilCardapio) {
        linkPerfilCardapio.style.display = 'inline-block';
    }
    if (sair) {
        sair.style.display = 'inline-block';
        sair.addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.removeItem('usuarioCadastrado');
            localStorage.removeItem('usuarioData');
            window.location.href = "login.html";
        });
    }
    if (sairCardapio) {
        sairCardapio.style.display = 'inline-block';
        sairCardapio.addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.removeItem('usuarioCadastrado');
            localStorage.removeItem('usuarioData');
            window.location.href = "login.html";
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('index.html') || 
        window.location.pathname.endsWith('/')) {
        if (verificarAutenticacao()) {
            exibirLinksAutenticados();
        }
    }
    
    if (window.location.pathname.includes('cardapio.html')) {
        if (verificarAutenticacao()) {
            exibirLinksAutenticados();
        }
    }
});
