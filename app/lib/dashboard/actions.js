import { connectToDB } from "../utils";
import { Sample, Enrichment, Phage } from "../models";
export const countSamples = async () => {
  try {
    connectToDB();
    const sample_count = await Sample.find().countDocuments();
    const monthData = new Date();
    monthData.setMonth(monthData.getMonth() - 1);
    const sanple_last_month = await Sample.find({
      date_taken: { $gte: monthData },
    }).countDocuments();

    return { sample_count, sanple_last_month };
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch samples", error);
  }
};

export const countEnrichments = async () => {
  try {
    connectToDB();
    const enrichment_count = await Enrichment.find().countDocuments();

    const monthData = new Date();
    monthData.setMonth(monthData.getMonth() - 1);
    const enrichments_last_month = await Enrichment.find({
      date: { $gte: monthData },
    }).countDocuments();

    return { enrichment_count, enrichments_last_month };
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch enrichments", error);
  }
};

export const countPhages = async () => {
  try {
    connectToDB();
    const phage_count = await Phage.find().countDocuments();

    const monthData = new Date();
    monthData.setMonth(monthData.getMonth() - 1);
    const phages_last_month = await Phage.find({
      date: { $gte: monthData },
    }).countDocuments();

    return { phage_count, phages_last_month };
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch enrichments", error);
  }
};
