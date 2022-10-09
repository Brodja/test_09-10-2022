require("dotenv").config();
const db = require("./app/config/db");
const User = require("./app/models/User");

db().then();

const importData = async () => {
  const users = [
    {
      name: "User 1",
      my_id: 1
    },
    {
      name: "User 2",
      my_id: 2
    },
    {
      name: "User 3",
      my_id: 3
    },
  ];
  try {
    await User.create(users);
    console.log(`Data successfully imported`);
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

const deleteData = async () => {
  try {
    await User.deleteMany();
    console.log(`Data successfully deleted`);
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === "-i") {
  importData().then();
} else if (process.argv[2] === "-d") {
  deleteData().then();
}
