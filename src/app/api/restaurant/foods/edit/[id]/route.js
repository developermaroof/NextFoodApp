import { connectionStr } from "@/app/libraries/db";
import { foodSchema } from "@/app/libraries/models/foodsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(req, context) {
  // Await the dynamic parameters before accessing them
  const { id } = await context.params;
  let success = false;
  await mongoose.connect(connectionStr);
  const result = await foodSchema.findOne({ _id: id });
  if (result) {
    success = true;
  }
  return NextResponse.json({ result, success });
}

export async function PUT(req, context) {
  // Await the dynamic parameters before accessing them
  const { id } = await context.params;
  const payload = await req.json();
  let success = false;
  await mongoose.connect(connectionStr);
  const result = await foodSchema.findOneAndUpdate({ _id: id }, payload);
  if (result) {
    success = true;
  }
  return NextResponse.json({ result, success });
}
