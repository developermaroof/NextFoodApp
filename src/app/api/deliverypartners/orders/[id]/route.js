import { connectionStr } from "@/app/libraries/db";
import { orderSchema } from "@/app/libraries/models/ordersModel";
import { restaurantSchema } from "@/app/libraries/models/restaurantsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(req, content) {
  // Await params before using its properties
  const { id } = await content.params;
  let result;
  let success = false;

  await mongoose.connect(connectionStr, { useNewUrlParser: true });

  // Create an ObjectId using the new keyword
  const deliveryBoyObjectId = new mongoose.Types.ObjectId(id);

  result = await orderSchema.find({ deliveryBoy_id: deliveryBoyObjectId });

  if (result) {
    const restoData = await Promise.all(
      result.map(async (item) => {
        const restoInfo = {};
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
