
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


document.addEventListener('DOMContentLoaded', function () {
    if (!document.getElementById('pedidoForm')) return; // só 

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
            toast.textContent = 'Pedido enviado com sucesso — redirecionando ao início...';
            document.body.appendChild(toast);

            
            setTimeout(() => {
                toast.style.opacity = '0';
                setTimeout(() => {
                    toast.remove();
                    window.location.href = 'index.html';
                }, 350);
            }, 1100);
        });
    }
});
// --- SALVAR CADASTRO DO USUÁRIO ---
const cadastroForm = document.getElementById("cadastroForm");

if (cadastroForm) {
    cadastroForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const usuario = {
            nome: document.getElementById("nome").value,
            email: document.getElementById("email").value,
            telefone: document.getElementById("telefone").value,
            senha: document.getElementById("senha").value,
            endereco: document.getElementById("endereco").value,
            cep: document.getElementById("cep").value,
            bairro: document.getElementById("bairro").value,
            numero: document.getElementById("numero").value,
            complemento: document.getElementById("complemento").value,
            referencia: document.getElementById("referencia").value
        };

        localStorage.setItem("usuario", JSON.stringify(usuario));

        // Redirecionar após cadastrar
        window.location.href = "cardapio.html";
    });
}
// --- LOGIN ---
const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const login = document.getElementById("login").value;
        const senha = document.getElementById("loginSenha").value;

        const usuarioSalvo = JSON.parse(localStorage.getItem("usuario"));

        if (!usuarioSalvo) {
            alert("Nenhuma conta cadastrada!");
            return;
        }

        if (
            (login === usuarioSalvo.email || login === usuarioSalvo.telefone) &&
            senha === usuarioSalvo.senha
        ) {
            window.location.href = "cardapio.html";
        } else {
            alert("Login incorreto!");
        }
    });
}
// --- AUTO-PREENCHER FORMULÁRIO DE PEDIDOS ---
function preencherFormularioPedido() {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    if (!usuario) return;

    const ids = [
        "nome", "email", "telefone",
        "endereco", "cep", "bairro",
        "numero", "complemento", "referencia"
    ];

    ids.forEach(id => {
        let campo = document.getElementById(id);
        if (campo) campo.value = usuario[id] || "";
    });
}

document.addEventListener("DOMContentLoaded", preencherFormularioPedido);
