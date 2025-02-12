import { connectionStr } from "@/app/libraries/db";
import { deliveryPartnersSchema } from "@/app/libraries/models/deliverypartnersModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(req, content) {
  let city = content.params.city;
  let success = false;
  await mongoose.connect(connectionStr, { useNewUrlParser: true });
  let filter = { city: { $regex: new RegExp(city, "i") } };
  const result = await deliveryPartnersSchema.find(filter);
  return NextResponse.json({ result });
}
