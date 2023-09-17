const ul = document.querySelector('#transactions')
const totalTotal = document.querySelector('#balance')
const totalReceita = document.querySelector('#money-plus')
const totalDespesa = document.querySelector('#money-minus')
const form = document.querySelector('#form')
const inputName = document.querySelector('#text')
const inputValor = document.querySelector('#amount')

const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'))
let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : []
const atualizarLocalStorage = () => {
    localStorage.setItem('transactions', JSON.stringify(transactions))
}


const removerTransacao = id =>{
    transactions = transactions.filter(valor => valor.id !== id)
    init()
    atualizarLocalStorage()
}

const addTransactionIntoDOM = ({amount, name, id}) => {
    const operator = amount < 0 ? '-' : '+'
    const classeLi = amount < 0 ? 'minus' : 'plus'

    const li = document.createElement('li')
    li.classList.add(classeLi)
    li.innerHTML = `${name} <span> ${operator}$ ${Math.abs(amount)}</span> 
        <button class="delete-btn" onclick="removerTransacao(${id})">x</button>
    `
    ul.prepend(li)
}

const atualizarTotal = () =>{
    const transactionsAmount = transactions.map(transaction => transaction.amount)
    const total = transactionsAmount
        .reduce((acumulado , item) => acumulado + item, 0)
        .toFixed(2)
    const receita = transactionsAmount
        .filter(valor => valor > 0)
        .reduce((acumulador, item) => acumulador + item, 0)
        .toFixed(2)
    const despesa = transactionsAmount
        .filter(valor => valor < 0)
        .reduce((acumulador, item) => acumulador + item, 0)
        .toFixed(2)

    totalTotal.textContent = `R$ ${total}`
    totalReceita.textContent = `R$ ${receita}`
    totalDespesa.textContent = `R$ ${despesa}`
}

const init = () => {
    ul.innerHTML =''
    transactions.forEach(addTransactionIntoDOM)
    atualizarTotal()
}

init()

const generateID = () => Math.round(Math.random()*1000)
form.addEventListener('submit', event =>{
    event.preventDefault()

    if(inputName.value.trim() === '' || inputValor.value.trim() === ''){
        alert('Insira todos os dados!')
        return
    }
    
    const novaTransacao = {
        id: generateID(),
        name: inputName.value.trim(),
        amount: Number(inputValor.value.trim())
    }

    transactions.push(novaTransacao)
    init()
    atualizarLocalStorage()

    inputName.value = ''
    inputValor.value = ''
})