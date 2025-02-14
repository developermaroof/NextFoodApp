import { connectionStr } from "@/app/libraries/db";
import { deliveryPartnersSchema } from "@/app/libraries/models/deliverypartnersModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(req, context) {
  // Await the params promise before using them
  const params = await context.params;
  let city = params.city;

  // Connect to MongoDB (remove deprecated options if desired)
  await mongoose.connect(connectionStr);

  let filter = { city: { $regex: new RegExp(city, "i") } };
  const result = await deliveryPartnersSchema.find(filter);

  return NextResponse.json({ result });
}
