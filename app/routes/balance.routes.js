module.exports = app => {
    const balance = require("../controllers/balance.controller");
  
    const router = require("express").Router();

    router.get("/:id/:currency?", balance.findOne);

    router.post("/balance_change", balance.change) 

    router.post("/transfer", balance.transfer)
  
    app.use('/api/balance', router);
  };