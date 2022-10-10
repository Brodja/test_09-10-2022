require("dotenv").config();
const Story = require("../models/Story");

exports.getStory = async (req, res) => {
  const userId = +req.params.id;
  const page = +req.params.page;
  const limit = +req.params.limit;
  const sort = req.params.sort;

  console.log(page, limit, sort);
  if (page && limit && sort) {
    console.log(page, limit, sort);
  }
  try {
    if (typeof userId !== "number" || userId < 1) {
      res.status(400).json("params error");
      return;
    }
    if (page && limit && sort) {
      const sortType = ["sum", "date"];
      if (
        typeof userId !== "number" ||
        userId < 0 ||
        typeof page !== "number" ||
        page < 0 ||
        typeof limit !== "number" ||
        limit < 0 ||
        typeof sort !== "string" ||
        !sortType.includes(sort)
      ) {
        res.status(400).json("params error");
        return;
      }
    }
    let list = null;
    const total = await Story.countDocuments({});
    if (page && limit && sort) {
      const sortField = sort === 'sum' ? 'value' : 'date';
      list = await Story.find({
        $or: [{ id_from: userId }, { id_to: userId }],
      })
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .sort(sortField);
        console.log(list)
    } else {
      list = await Story.find({
        $or: [{ id_from: userId }, { id_to: userId }],
      });
    }

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
    res.json({list: result, total});
  } catch (error) {
    console.log(error);
    res.status(404).json(error.message);
  }
};
