import obterTokenTiny from '../services/MiliApp/obterTokenTiny.js';
import changeTinyOrderStatus from '../services/changeTinyOrderStatus.js';
import atualizarSituacaoPedidoV3 from '../services/Tiny_V3/atualizarSituacaoPedido.js';

class PagarMeController {

    static async postbackOrders(req, res) {
        console.log('Recebendo o postbackOrders da Pagar.me');
        let request = req.body;
        // console.log(request);
        let id = request.id;
        let event = request.event;
        let current_status = request.current_status;

        if (current_status  === 'paid') {
            let order = request.order;
            let items = order.items;
            let id_tiny = items[0].id
            let description = items[0].description

            try {
                description = description.split("_");
                console.log(description[0]);
                console.log(description[1]);

                if (description[0] === 'miligrama') {
                    var origin = 'miligrama';
                }
                else if (description[0] === 'fortaleza') {
                    var origin = 'miligrama_nordeste';
                }
                else {
                    var origin = 'miligrama';
                }
            }
            catch(e) {
                console.error(`Erro ao obter origem: ${e.message}`);
                var origin = 'miligrama';
            }

            try {
                let token_response = await obterTokenTiny();
                token_response = JSON.parse(token_response);

                for (let k = token_response.length - 1; k >= 0; k--) {
                    let token_origin = token_response[k].origin;
                    if (token_origin === origin) {
                        var access_token = token_response[k].access_token;
                    }
                }

                let response_atualizacao_v3 = await atualizarSituacaoPedidoV3(access_token, id_tiny, 3);
                console.log(response_atualizacao_v3);
                console.log(`Pedido ${id_tiny} atualizado para aprovado pela API V3!`);
            }
            catch(e) {
                console.error(`Erro ao usar API_V3: ${e.message}`)
            }
        }

        res.status(200).send('OK');
    }

    static async postbackTransactions(req, res) {
        console.log('Recebendo o postbackTransactions da Pagar.me');
        let request = req.body
        res.status(200).send('OK');
    }

    static async pedidosV5(req, res) {
        console.log('Recebendo notificação do checkoutV5 da Pagar.me');
        let request = req.body;
        // console.log(request);
        let status = request.data.status;
        let items = request.data.items[0];
        // console.log(items);
        let description = items.description;
        let id_tiny = items.code;

        if (status === 'paid') {
            try {
                description = description.split("_");
                console.log(description[0]);
                console.log(description[1]);

                if (description[0] === 'miligrama') {
                    var origin = 'miligrama';
                }
                else if (description[0] === 'fortaleza') {
                    var origin = 'miligrama_nordeste';
                }
                else {
                    var origin = 'miligrama';
                }
            }
            catch(e) {
                console.error(`Erro ao obter origem: ${e.message}`);
                var origin = 'miligrama';
            }
            console.log(`origin: ${origin}`);

            try {
                let token_response = await obterTokenTiny();
                token_response = JSON.parse(token_response);

                for (let k = token_response.length - 1; k >= 0; k--) {
                    let token_origin = token_response[k].origin;
                    if (token_origin === origin) {
                        var access_token = token_response[k].access_token;
                    }
                }
            }
            catch(e) {
                console.error(`Erro ao obter chave de acesso: ${e}`);
            }

            try {
                // let token_response = await obterTokenTiny();
                // token_response = JSON.parse(token_response);
                // let access_token = token_response[token_response.length - 1].access_token;
                let response_atualizacao_v3 = await atualizarSituacaoPedidoV3(access_token, id_tiny, 3);
                console.log(response_atualizacao_v3);
                if (response_atualizacao_v3.message !== 'Pedido não encontrado') {
                    console.log(`${description} atualizado para aprovado pela API V3!`);
                }
                else {
                    console.log(`Pedido não atualizado: ${response_atualizacao_v3.message}`);
                }
            }
            catch(e) {
                console.error(`Erro ao usar API_V3: ${e.message}`);
            }
        }
        res.status(200).send('OK');
    }

}

export default PagarMeController
