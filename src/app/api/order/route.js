import { connectionStr } from "@/app/libraries/db";
import { orderSchema } from "@/app/libraries/models/ordersModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(req) {
  const payload = await req.json();
  let result;
  let success = false;
  await mongoose.connect(connectionStr, { useNewUrlParse: true });
  const orderObj = new orderSchema(payload);
  result = await orderObj.save();
  if (result) {
    success = true;
  }
  return NextResponse.json({ result, success });
}
