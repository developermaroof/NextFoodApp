import { connectionStr } from "@/app/libraries/db";
import { orderSchema } from "@/app/libraries/models/ordersModel";
import { restaurantSchema } from "@/app/libraries/models/restaurantsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(req) {
  const payload = await req.json();
  let result;
  let success = false;
  await mongoose.connect(connectionStr, { useNewUrlParser: true });
  const orderObj = new orderSchema(payload);
  result = await orderObj.save();
  if (result) {
    success = true;
  }
  return NextResponse.json({ result, success });
}

export async function GET(req) {
  const userId = req.nextUrl.searchParams.get("id");
  let result;
  let success = false;
  await mongoose.connect(connectionStr, { useNewUrlParser: true });
  result = await orderSchema.find({ user_id: userId });
  if (result) {
    let restoData = await Promise.all(
      result.map(async (item) => {
        let restoInfo = {};
        restoInfo.data = await restaurantSchema.findOne({ _id: item.resto_id });
        restoInfo.amount = item.amount;
        restoInfo.status = item.status;
        return restoInfo;
      })
    );
    result = restoData;
    success = true;
  }
  return NextResponse.json({ result, success });
}
