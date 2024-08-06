"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Phage } from "../models";
import { connectToDB } from "../utils";

export const fetchPhages = async (q, page) => {
  const regex = new RegExp(q, "i");
  const ITEM_PER_PAGE = 10;
  try {
    connectToDB();
    const count = await Phage.find({
      full_name: { $regex: regex },
    }).countDocuments();

    const phages = await Phage.find({ full_name: { $regex: regex } })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));
    return { count, phages };
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch phages", error);
  }
};
