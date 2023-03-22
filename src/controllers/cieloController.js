import getAuthorization from "../Authorization/authorizationProcess.js"
import putNetSuite from "../Authorization/putNetSuite.js"


class CieloController {

    static receiveNotification = (req, res) => {
        console.log('Recebendo o POST da cielo');

        console.log(req.body.checkout_cielo_order_number);
        console.log(req.body.order_number);

        console.log('Montando o payload');

        let request = req.body

        // let request = {
        //     "recordtype":"customrecord_paymentlinks",
        //     "type":"customrecord_paymentlinks",
        //     "id": req.body.product_id,
        //     "name": req.body.product_id,
        //     "checkout_cielo_order_number": req.body.checkout_cielo_order_number,
        //     "amount": req.body.amount,
        //     "order_number": req.body.order_number,
        //     "created_date": req.body.created_date,
        //     "customer_name": req.body.customer_name,
        //     "customer_identity": req.body.customer_identity,
        //     "customer_email": req.body.customer_email,
        //     "customer_phone": req.body.customer_phone,
        //     "discount_amount": req.body.discount_amount,
        //     "shipping_type": req.body.shipping_type,
        //     "shipping_name": req.body.shipping_name,
        //     "shipping_price": req.body.shipping_price,
        //     "shipping_address_zipcode": req.body.shipping_address_zipcode,
        //     "shipping_address_district": req.body.shipping_address_district,
        //     "shipping_address_city": req.body.shipping_address_city,
        //     "shipping_address_state": req.body.shipping_address_state,
        //     "shipping_address_line1": req.body.shipping_address_line1,
        //     "shipping_address_line2": req.body.shipping_address_line2,
        //     "shipping_address_number": req.body.shipping_address_number,
        //     "payment_method_type": req.body.payment_method_type,
        //     "payment_method_brand": req.body.payment_method_brand,
        //     "payment_method_bank": req.body.payment_method_bank,
        //     "payment_maskedcreditcard": req.body.payment_maskedcreditcard,
        //     "payment_installments": req.body.payment_installments,
        //     "payment_antifrauderesult": req.body.payment_antifrauderesult,
        //     "payment_boletonumber": req.body.payment_boletonumber,
        //     "payment_boletoexpirationdate": req.body.payment_boletoexpirationdate,
        //     "payment_status": req.body.payment_status,
        //     "tid": req.body.tid,
        //     "test_transaction": req.body.test_transaction,
        //     "product_id": req.body.product_id,
        //     "product_type": req.body.product_type,
        //     "product_sku": req.body.product_sku,
        //     "product_max_number_of_installments": req.body.product_max_number_of_installments,
        //     "product_expiration_date": req.body.product_expiration_date,
        //     "product_quantity": req.body.product_quantity,
        //     "product_description": req.body.product_description,
        //     "nsu": req.body.nsu,
        //     "authorization_code": req.body.authorization_code,
        //     "req": req
        // }
        
        // req.body.checkout_cielo_order_number;
        let type = 'PUT';

        console.log('Autorizando o PUT');
        let authorization = getAuthorization(type);

        console.log('Enviando ao NetSuite');
        putNetSuite(authorization, request, res);
    }
}

export default CieloController