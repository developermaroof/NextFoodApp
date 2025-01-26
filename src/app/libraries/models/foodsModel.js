const { default: mongoose } = require("mongoose");

const foodModel = new mongoose.Schema({
  name: String,
  price: String,
  path: String,
  description: String,
  food_id: mongoose.Schema.Types.ObjectId,
});

export const foodSchema =
  mongoose.models.foods || mongoose.model("foods", foodModel);
