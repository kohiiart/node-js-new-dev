
const exemplo = 'EXEMPLO MAIS LOCO DO MUNDO';

// Função async 
const entregouPedidoCozinha = async () => {
  const response = await fetch('http://localhost:3001');

  console.log('O GARÇOM O PEDIDO FICOU PRONTO VEM K PEGAR: ', await response.json());
}

console.log('entregou pedido fila cozinha (adicionou no event loop');
entregouPedidoCozinha();

console.log('foi para a próxima mesa');

fetch('http://localhost:3001')
.then((response) => {
  console.log('Fez um pedido', response);
})
.catch((error) => {
  console.log('isso deu pau', error);
})
.finally(() => {
  console.log('requisição finalizou');
})


