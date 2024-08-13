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
            let id = items[0].id
            // console.log(`items[0].id = ${items[0].id}`)
            // await changeTinyOrderStatus(items[0].id, 'aprovado');

            try {
                let token_response = await obterTokenTiny();
                token_response = JSON.parse(token_response);
                let access_token = token_response[token_response.length - 1].access_token;
                let response_atualizacao_v3 = await atualizarSituacaoPedidoV3(access_token, id, 3);
                console.log(response_atualizacao_v3);
                console.log(`Pedido ${id} atualizado para aprovado pela API V3!`);
            }
            catch(e) {
                console.error(`Erro ao  usar API_V3: ${e.message}`)
                await changeTinyOrderStatus(items[0].id, 'aprovado');
                console.log(`Pedido ${id} atualizado para aprovado!`);
            }
        }

        res.status(200).send('OK');
    }

    static async postbackTransactions(req, res) {
        console.log('Recebendo o postbackTransactions da Pagar.me');
        let request = req.body
        res.status(200).send('OK');
    }

}

export default PagarMeController
