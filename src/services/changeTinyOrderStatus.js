const TOKEN = process.env.TINY_TOKEN;

async function changeTinyOrderStatus(idPedido, situacao) {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: 'POST',
        headers: myHeaders
    };

    return fetch(`https://api.tiny.com.br/api2/pedido.alterar.situacao?token=${TOKEN}&id=${idPedido}&situacao=${situacao}&formato=JSON`, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}

export default changeTinyOrderStatus;
