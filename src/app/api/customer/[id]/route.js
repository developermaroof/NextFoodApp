import { connectionStr } from "@/app/libraries/db";
import { foodSchema } from "@/app/libraries/models/foodsModel";
import { restaurantSchema } from "@/app/libraries/models/restaurantsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(req, content) {
  console.log(content.params.id);
  const id = content.params.id;
  await mongoose.connect(connectionStr, { useNewUrlParser: true });
  const restaurantDetails = await restaurantSchema.findOne({ _id: id });
  const foodItems = await foodSchema.find({
    food_id: id,
  });
  return NextResponse.json({ restaurantDetails, foodItems, success: true });
}
