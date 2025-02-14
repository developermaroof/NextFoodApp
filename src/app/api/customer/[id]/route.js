import { connectionStr } from "@/app/libraries/db";
import { foodSchema } from "@/app/libraries/models/foodsModel";
import { restaurantSchema } from "@/app/libraries/models/restaurantsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(req, context) {
  // Await the params before using them
  const params = await context.params;
  const { id } = params;

  await mongoose.connect(connectionStr);
  const restaurantDetails = await restaurantSchema.findOne({ _id: id });
  const foodItems = await foodSchema.find({ food_id: id });

  return NextResponse.json({ restaurantDetails, foodItems, success: true });
}
