import { connectionStr } from "@/app/libraries/db";
import { restaurantSchema } from "@/app/libraries/models/restaurantsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(req) {
  let queryParams = req.nextUrl.searchParams;
  console.log(queryParams.get("restaurant"));
  let filter = {};
  if (queryParams.get("location")) {
    let city = queryParams.get("location");
    filter = { city: { $regex: new RegExp(city, "i") } };
  } else if (queryParams.get("restaurant")) {
    let restaurantName = queryParams.get("restaurant");
    filter = { restaurantName: { $regex: new RegExp(restaurantName, "i") } };
  }
  await mongoose.connect(connectionStr, { useNewUrlParser: true });
  let result = await restaurantSchema.find(filter);

  return NextResponse.json({ result, success: true });
}
