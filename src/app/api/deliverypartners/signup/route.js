import { connectionStr } from "@/app/libraries/db";
import { deliveryPartnersSchema } from "@/app/libraries/models/deliverypartnersModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(req) {
  const payload = await req.json();
  let success = false;
  await mongoose.connect(connectionStr, { useNewUrlParser: true });
  const deliverypartners = new deliveryPartnersSchema(payload);
  const result = await deliverypartners.save();
  if (result) {
    success = true;
  }
  return NextResponse.json({ result, success });
}
