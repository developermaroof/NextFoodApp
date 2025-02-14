import { connectionStr } from "@/app/libraries/db";
import { foodSchema } from "@/app/libraries/models/foodsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(req, context) {
  const { id } = await context.params; // Await dynamic params before accessing properties
  let success = false;
  await mongoose.connect(connectionStr);
  const result = await foodSchema.find({ food_id: id });
  if (result) {
    success = true;
  }
  return NextResponse.json({ result, success });
}

export async function DELETE(req, context) {
  const { id } = await context.params; // Await dynamic params here as well
  let success = false;
  await mongoose.connect(connectionStr);
  const result = await foodSchema.deleteOne({ _id: id });
  if (result.deletedCount > 0) {
    success = true;
  }
  return NextResponse.json({ result, success });
}
