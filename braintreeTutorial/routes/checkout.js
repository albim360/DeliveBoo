const express = require('express');
const router = express.Router();
const braintree = require('braintree');

router.post('/', (req, res, next) => {
  const gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    // Use your own credentials from the sandbox Control Panel here
    merchantId: '748b2m3dq2wrsn9n',
    publicKey: 'rkg5sxzmdpkry6w5',
    privateKey: 'sandbox_s9d8kg26_748b2m3dq2wrsn9n'
  });

  // Use the payment method nonce here
  const nonceFromTheClient = req.body.paymentMethodNonce;
  // Create a new transaction for $10
  const newTransaction = gateway.transaction.sale({
    amount: '10.00',
    paymentMethodNonce: nonceFromTheClient,
    options: {
      // This option requests the funds from the transaction
      // once it has been authorized successfully
      submitForSettlement: true
    }
  }, (error, result) => {
      if (result) {
        res.send(result);
      } else {
        res.status(500).send(error);
      }
  });
});

module.exports = router;