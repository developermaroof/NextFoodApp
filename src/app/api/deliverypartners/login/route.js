import { connectionStr } from "@/app/libraries/db";
import { deliveryPartnersSchema } from "@/app/libraries/models/deliverypartnersModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(req) {
  const payload = await req.json();
  let success = false;
  await mongoose.connect(connectionStr, { useNewUrlParser: true });
  const result = await deliveryPartnersSchema.findOne({
    phone: payload.phone,
    password: payload.password,
  });
  if (result) {
    success = true;
  }
  return NextResponse.json({ result, success });
}
