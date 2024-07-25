import { Sample } from "./models";
import { connectToDB } from "./utils";

export const fetchSamples = async () => {
  try {
    connectToDB();
    const samples = await Sample.find();
    return samples;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch samples", error);
  }
};
