import { connectionStr } from "@/app/libraries/db";
import { foodSchema } from "@/app/libraries/models/foodsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(req) {
  const payload = await req.json();
  await mongoose.connect(connectionStr, { useNewUrlParser: true });
  const food = new foodSchema(payload);
  const result = await food.save();
  return NextResponse.json({ result, success: true });
}
