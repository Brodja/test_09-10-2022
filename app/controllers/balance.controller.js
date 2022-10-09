const User = require("../models/User");
const db = require("../config/db");

exports.findOne = async (req, res) => {
  const my_id = req.params.id;
  const user = await User.findOne({ my_id: +my_id });
  if (user) {
    res.json({ balance: user.balance });
  } else {
    res.json({ message: "User not found" });
  }
};

exports.change = async (req, res) => {
  const { id, value, type } = req.body;
  try {
    const user = await User.findOne({ my_id: +id });
    if (!user) {
      throw new Error('User not found!');
    } else {
      if (type === "-" && user.balance < value) {
        throw new Error('Insufficient funds!');
      } else {
        const newBalance = type === "+" ? user.balance + value : user.balance - value;
        await User.findOneAndUpdate(
          { my_id: +id },
          { balance: newBalance }
        )
      }
    }
    res.send('ok')
  } catch (error) {
    console.log(error);
    res.send(error.message)
  }
};

exports.transfer = async (req, res) => {
  const { id_from, id_to, value, description } = req.body;
  try {
    const user_from = await User.findOne({ my_id: +id_from });
    const user_to = await User.findOne({ my_id: +id_to });
    if(!user_from && !user_to){
      throw new Error('User not found!');
    } else {

    }
    
  } catch (error) {
    console.log(error);
    res.send(error.message)
  }
};

function operation(id, value, type){

}


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