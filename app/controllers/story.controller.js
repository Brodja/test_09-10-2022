require("dotenv").config();
const Story = require("../models/Story");

exports.getStory = async (req, res) => {
  try {
    const userId = +req.params.id;
    if (typeof userId !== "number" || userId < 1) {
      res.status(400).json("params error");
      return;
    }
    const list = await Story.find({
      $or: [{ id_from: userId }, { id_to: userId }],
    });
    const result = [];
    list.forEach((item) => {
      const operation = {
        result: null,
        value: item.value,
        description: item.description,
        date: item.date,
      };
      if (item.id_from && item.id_to) {
        if (item.id_from === userId) {
          operation.result = `From my balance to user with id ${item.id_from}`;
        } else {
          operation.result = `To my balance from user with id ${item.id_from}`;
        }
      } else {
        if (item.id_from) {
          operation.result = `From my balance`;
        } else {
          operation.result = `To my balance`;
        }
      }
      result.push(operation);
    });
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(404).json(error.message);
  }
};
