import changeTinyOrderStatus from '../services/changeTinyOrderStatus.js';

class TunaController {

    static async receiveNotification(req, res) {
        console.log('Recebendo o notificação da tuna');
        let request = req.body
        let statusId = request.statusId;
        let partnerUniqueId = request.partnerUniqueId;
        // let paymentKey = request.paymentKey;

        if (statusId === '2' &&
        partnerUniqueId.length > 6 && partnerUniqueId.length < 10) {
            console.log(`Atualizando pedido ${partnerUniqueId} para aprovado`);
            await changeTinyOrderStatus(partnerUniqueId, 'aprovado');
            res.status(200).send();
        }

        res.status(200).send();
    }

}

export default TunaController
