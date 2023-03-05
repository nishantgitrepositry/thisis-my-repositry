const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const mongoURI =
  "mongodb+srv://Nishant:Nishantdoble@cluster0.50tqgob.mongodb.net/GoFood?retryWrites=true&w=majority";

const mongoDB = async () => {
  await mongoose.connect(
    mongoURI,
    { useNewUrlParser: true },
    async (err, result) => {
      if (err) console.log("...", err);
      else {
        console.log("connected succesfully");
        const fetched_data = await mongoose.connection.db.collection(
          "food_items"
        );
        fetched_data.find({}).toArray(async function (err, data) {
          const food_Category = await mongoose.connection.db.collection(
            "food_Category"
          );
          food_Category.find({}).toArray(function (err, catData) {
            if (err) console.log(err);
            else {
              global.food_items = data;
            //  console.log(global.food_items);
              global.food_Category = catData;
            }
          });
          
        });
      }
    }
  );
};

module.exports = mongoDB;
