
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
