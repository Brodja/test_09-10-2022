module.exports = app => {
    const balance = require("../controllers/balance.controller");
  
    const router = require("express").Router();

    //get balance by id
    router.get("/:id/:currency?", balance.findOne);
    
    //+/- from balance
    router.post("/balance_change", balance.change) 

    //transfer
    router.post("/transfer", balance.transfer)
  
    app.use('/api/balance', router);
  };