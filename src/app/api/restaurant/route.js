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
  let result;
  let success = false;
  await mongoose.connect(connectionStr, { useNewUrlParser: true });
  if (payload.login) {
    // for login
    result = await restaurantSchema.findOne({
      email: payload.email,
      password: payload.password,
    });
    if (result) {
      success = true;
    }
  } else {
    // for signup
    const restaurant = new restaurantSchema(payload);
    result = await restaurant.save();
    if (result) {
      success = true;
    }
  }

  return NextResponse.json({ result, success });
}
