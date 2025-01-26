import { connectionStr } from "@/app/libraries/db";
import { foodSchema } from "@/app/libraries/models/foodsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(req, content) {
  const id = content.params.id;
  let success = false;
  await mongoose.connect(connectionStr, { useNewUrlParser: true });
  const result = await foodSchema.find({ food_id: id });
  if (result) {
    success = true;
  }
  return NextResponse.json({ result, success });
}
