require("dotenv").config();
const User = require("../models/User");
const Story = require("../models/Story");
const mongoose = require("mongoose");
const db = require("../config/db");

exports.findOne = async (req, res) => {
  const my_id = +req.params.id;
  const currency = req.params.currency;
  if (
    typeof my_id !== "number" ||
    my_id < 1 ||
    (currency && typeof currency !== "string")
  ) {
    res.status(400).json("params error");
    return;
  }
  const user = await User.findOne({ my_id: my_id });

  if (user) {
    if (currency) {
      const balance_convert = await getCurr(currency, user.balance);
      console.log(balance_convert);
      if (!balance_convert || !balance_convert.success) {
        res.status(500).json({ message: "error" });
      } else {
        res.json({ balance: balance_convert.result });
      }
    } else {
      res.json({ balance: user.balance });
    }
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

exports.change = async (req, res) => {
  const { id, value, income } = req.body;
  if (
    typeof value !== "number" ||
    value < 0 ||
    typeof income !== "boolean" ||
    typeof id !== "number" ||
    id < 1
  ) {
    res.status(400).json("params error");
    return;
  }
  try {
    const user = await User.findOne({ my_id: id });
    if (!user) {
      throw new Error("User not found!");
    } else {
      if (!income && user.balance < value) {
        throw new Error("Insufficient funds!");
      } else {
        const newBalance = income ? user.balance + value : user.balance - value;
        await User.findOneAndUpdate({ my_id: id }, { balance: newBalance });

        const Log = {
          id_from: !income ? user.my_id : "",
          id_to: income ? user.my_id : "",
          value,
          description: "Simple operation",
        };
        await Story.create(Log);
      }
    }
    res.json("success");
  } catch (error) {
    console.log(error);
    res.status(404).json(error.message);
  }
};

exports.transfer = async (req, res) => {
  const { id_from, id_to, value, description } = req.body;
  if (
    typeof value !== "number" ||
    value < 0 ||
    typeof description !== "string" ||
    typeof id_from !== "number" ||
    id_from < 1 ||
    typeof id_to !== "number" ||
    id_to < 1
  ) {
    res.status(400).json("params error");
    return;
  }
  try {
    const user_from = await User.findOne({ my_id: id_from });
    const user_to = await User.findOne({ my_id: id_to });
    if (!user_from && !user_to) {
      throw new Error("User not found!");
    } else {
      if (user_from.balance < value) {
        throw new Error("Insufficient funds!");
      } else {
        const newBalanceFrom = user_from.balance - value;
        const newBalanceTo = user_to.balance + value;
        await User.findOneAndUpdate(
          { my_id: id_from },
          { balance: newBalanceFrom }
        );
        await User.findOneAndUpdate(
          { my_id: id_to },
          { balance: newBalanceTo }
        );
        const Log = {
          id_from: user_from.my_id,
          id_to: user_to.my_id,
          value,
          description,
        };
        await Story.create(Log);
      }
    }
    res.json("success");
  } catch (error) {
    console.log(error);
    res.status(404).json(error.message);
  }
};

async function getCurr(to, amount) {
  try {
    const myHeaders = new Headers();
    myHeaders.append("apikey", process.env.CurrApiKey);
    const requestOptions = {
      method: "GET",
      redirect: "follow",
      headers: myHeaders,
    };
    const from = "USD";
    const response = await fetch(
      `https://api.apilayer.com/currency_data/convert?to=${to}&from=${from}&amount=${amount}`,
      requestOptions
    );
    const result = await response.text();
    return JSON.parse(result);
  } catch (error) {
    console.log(error);
    return false;
  }
}

// async function operation(id, value, type){
//   try {
//     const user = await User.findOne({ my_id: +id });
//     if (!user) {
//       throw new Error('User not found!');
//     } else {
//       if (type === "-" && user.balance < value) {
//         throw new Error('Insufficient funds!');
//       } else {
//         const newBalance = type === "+" ? user.balance + value : user.balance - value;
//         await User.findOneAndUpdate(
//           { my_id: +id },
//           { balance: newBalance }
//         )
//       }
//     }
//     return 'ok';
//   } catch (error) {
//     console.log('1', error);
//     return error.message
//   }
// }

// exports.change = async (req, res) => {
//   const { id, value, type } = req.body;
//   // const session = await User.startSession();
//   // session.startTransaction();
//   try {
//     const user = await User.findOne({ my_id: +id })//.session(session);
//     if (!user) {
//       res.json({ message: "User not found" });
//     } else {
//       if (type === "-" && user.balance < value) {
//         throw new Error('Insufficient funds!');
//         // res.json({ message: "Insufficient funds" });
//       } else {
//         const newBalance = type === "+" ? user.balance + value : user.balance - value;
//         await User.findOneAndUpdate(
//           { my_id: +id },
//           { balance: newBalance }
//         )//.save({ session });
//       }
//     }
//     // await session.commitTransaction();
//     res.send('ok')
//   } catch (error) {
//     // await session.abortTransaction();
//     // session.endSession();
//     console.log(error);
//     res.send('fdsdfs')
//   } finally {
//     // session.endSession();
//   }

// };
