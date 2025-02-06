import { connectionStr } from "@/app/libraries/db";
import { userSchema } from "@/app/libraries/models/usersModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(req) {
  const payload = await req.json();
  let success = false;
  await mongoose.connect(connectionStr, { useNewUrlParser: true });
  const result = await userSchema.findOne({
    email: payload.email,
    password: payload.password,
  });
  if (result) {
    success = true;
  }
  return NextResponse.json({ result, success });
}
