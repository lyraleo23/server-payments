async function obterPedidoMiliApp(idPedidoTiny) {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders
    };

    return fetch(`https://api.fmiligrama.com/vendas/busca?idPedidoTiny=${idPedidoTiny}`, requestOptions)
        .then(response => response.text())
        // .then(result => console.log(result))
        .catch(error => console.log('error', error));
}

export default obterPedidoMiliApp;
