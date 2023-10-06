let listaDeItens = []
let itemAEditar

const form = document.getElementById("form-itens")
const itensInput = document.getElementById("receber-item")
const ulItens = document.getElementById("lista-de-itens")
const ulItensComprados = document.getElementById("itens-comprados")
const listaRecuperada = localStorage.getItem('listaDeItens')

function atualizaLocalStorage() { //Function criada para salvar os objetos na página/console
    localStorage.setItem('listaDeItens', JSON.stringify(listaDeItens))//O stringfy transforma elementos do tipo string
}

if(listaRecuperada) {
    listaDeItens = JSON.parse(listaRecuperada) //O .parse transforma elementos em dados do tipo JavaScript
    mostrarItem()
} else {
    listaDeItens = []
}

form.addEventListener("submit", function(evento) {
    evento.preventDefault()//o Default impede que algo aconteça com o item
    salvarItem()//para funcionar quando apertar o botão
    mostrarItem()//para mostrar o item na lista de compras
    itensInput.focus()
});

function salvarItem() {
    const comprasItem = itensInput.value//para pegar o valor que o itensInput contém
    //Da linha abaixo até o fechamento do else é para a verificação de se o item já existe na lista //************************************* */
    
    const checarDuplicado = listaDeItens.some(elemento => elemento.valor.toUpperCase() === comprasItem.toUpperCase())//O .toUppercase serve para o console considerar todos com letra maiúscula
    if(checarDuplicado) {
        alert("Item já existe!");
    }else{
    listaDeItens.push({
        valor: comprasItem,
        checar: false
    })
}
    itensInput.value = '' //Faz com que o input retorne vazio para o usuário escrever
}

function mostrarItem() {
    ulItens.innerHTML = ''
    ulItensComprados.innerHTML = ''

    listaDeItens.forEach((elemento, index) => {
        if(elemento.checar) {
            ulItensComprados.innerHTML += `
    <li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
        <div>
            <input type="checkbox" checked class="is-clickable" />  
            <span class="itens-comprados is-size-5">${elemento.valor}</span>
        </div>
        <div>
            <i class="fa-solid fa-trash is-clickable deletar"></i>
        </div>
    </li>
        `
        } else {
        ulItens.innerHTML += `
    <li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
        <div>
            <input type="checkbox" class="is-clickable" />
            <input type="text" class="is-size-5" value="${elemento.valor}" ${index !== Number(itemAEditar) ? 'disabled' : ''}></input>
        </div>

        <div>
            ${ index === Number(itemAEditar) ? '<button onclick="salvarEdicao()"><i class="fa-regular fa-floppy-disk is-clickable"></i></button>' : '<i class="fa-regular is-clickable fa-pen-to-square editar"></i>'}
            <i class="fa-solid fa-trash is-clickable deletar"></i>
        </div>
    </li>
    `
    }  
    })

    const inputsCheck = document.querySelectorAll('input[type="checkbox"]')

    inputsCheck.forEach(i => {
        i.addEventListener('click', (evento) => {
            const valorDoElemento = evento.target.parentElement.parentElement.getAttribute('data-value')//O target retorna um alvo //O parentElement repetido é para chamar o pai do pai (pai da div, que é o li)
            listaDeItens[valorDoElemento].checar = evento.target.checked
            mostrarItem()
        })
    })

const deletarObjetos = document.querySelectorAll(".deletar")

    deletarObjetos.forEach(i => {
        i.addEventListener('click', (evento) => {
            valorDoElemento = evento.target.parentElement.parentElement.getAttribute('data-value')
            listaDeItens.splice(valorDoElemento, 1,)
            mostrarItem()
        })
    })

    const editarItens = document.querySelectorAll(".editar")

    editarItens.forEach(i => {
        i.addEventListener('click', (evento) => {
            itemAEditar = evento.target.parentElement.parentElement.getAttribute('data-value')
            mostrarItem()
        })
  
    })

    atualizaLocalStorage() //Salva os objetos no host local

}

function salvarEdicao() {
    const itemEditado = document.querySelector(`[data-value="${itemAEditar}"] input[type="text"]`)
    listaDeItens[itemAEditar].valor = itemEditado.value
    console.log(listaDeItens)
    itemAEditar = -1
    mostrarItem()
}