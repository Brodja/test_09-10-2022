module.exports = app => {
    const story = require("../controllers/story.controller");
  
    const router = require("express").Router();

    router.get("/:id/:page?/:limit?/:sort?", story.getStory);
   
    app.use('/api/story', router);
  };