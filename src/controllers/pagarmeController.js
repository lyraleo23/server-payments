import changeTinyOrderStatus from '../services/changeTinyOrderStatus.js';

class PagarMeController {

    static async postbackOrders(req, res) {
        let request = req.body
        console.log('Recebendo o postbackOrders da Pagar.me');
        console.log(request);
        let id = request.id;
        let event = request.event;
        let current_status = request.current_status;

        if (current_status  === 'paid') {
            let order = request.order;
            let items = order.items;
            console.log(items[0]);
            changeTinyOrderStatus(items[0].id, 'aprovado');
        }

        res.status(200).send('OK');
    }

    static async postbackTransactions(req, res) {
        let request = req.body
        console.log('Recebendo o postbackTransactions da Pagar.me');
        // console.log(request);
        res.status(200).send('OK');
    }

}

export default PagarMeController
