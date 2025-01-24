import { connectionStr } from "@/app/libraries/db";
import { restaurantSchema } from "@/app/libraries/models/restaurantsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
  await mongoose.connect(connectionStr, { useNewUrlParser: true });
  const data = await restaurantSchema.find();
  console.log("Data From MongoDB", data);

  return NextResponse.json({ result: data });
}

export async function POST(req) {
  let payload = await req.json();
  await mongoose.connect(connectionStr, { useNewUrlParser: true });
  let restaurant = new restaurantSchema(payload);
  const data = await restaurant.save();
  return NextResponse.json({ result: data, success: true });
}
