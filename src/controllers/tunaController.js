import changeTinyOrderStatus from '../services/changeTinyOrderStatus.js';
import getTunaStatus from '../services/getTunaStatus.js';
import obterPedidoMiliApp from '../services/obterPedidoMiliApp.js';
import atualizarSituacaoPedidoV3 from '../services/Tiny_V3/atualizarSituacaoPedido.js';
import obterTokenTiny from '../services/MiliApp/obterTokenTiny.js';


class TunaController {

    static async receiveNotification(req, res) {
        console.log(`Recebendo o notificação da tuna: ${req.body.partnerUniqueId}`);
        let request = req.body;
        // console.log(request)
        let statusId = request.statusId;
        console.log(`statusId: ${statusId}`);
        let partnerUniqueId = request.partnerUniqueId;
        let paymentKey = request.paymentKey;

        if (statusId === '2' && partnerUniqueId.length > 8 && partnerUniqueId.length < 11) {
            let pedidoMiliApp = await obterPedidoMiliApp(partnerUniqueId);
            pedidoMiliApp = JSON.parse(pedidoMiliApp);

            let status = pedidoMiliApp.data[0].status;
            console.log(`Status do pedido ${partnerUniqueId}: ${status}`);

            if (status === 'aprovado' || status === 'preparando_envio' || status === 'faturado') {
                console.log(`Pedido ${partnerUniqueId} já está aprovado`);
            }
            else {
                console.log(`Atualizando pedido ${partnerUniqueId} para aprovado`);
                // await changeTinyOrderStatus(partnerUniqueId, 'aprovado');
                // console.log(`Pedido ${partnerUniqueId} atualizado para aprovado`);

                try {
                    let description = request.items[0].productDescription;
                    description = description.split("_");
    
                    if (description === 'miligrama') {
                        var origin = 'miligrama';
                    }
                    else if (description === 'fortaleza') {
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
                    let response_atualizacao_v3 = await atualizarSituacaoPedidoV3(access_token, partnerUniqueId, 3);
                    console.log(response_atualizacao_v3);
                    console.log(`Pedido ${partnerUniqueId} atualizado para aprovado pela API V3!`);
                }
                catch(e) {
                    console.error(`Erro ao  usar API_V3: ${e.message}`)
                    await changeTinyOrderStatus(partnerUniqueId, 'aprovado');
                    console.log(`Pedido ${partnerUniqueId} atualizado para aprovado!`);
                }
                
            }
        }
        if (statusId === '5' &&
        partnerUniqueId.length > 8 && partnerUniqueId.length < 11) {
            // console.log(`Enviando notificação de pedido cancelado!`);
            // await changeTinyOrderStatus(partnerUniqueId, 'cancelado');
        }

        res.status(200).send('OK');
    }

}



export default TunaController
