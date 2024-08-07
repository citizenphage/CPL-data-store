/* all this code runs on the server side due to the use server line */
"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { Host } from "../models";
import { connectToDB } from "../utils";

export const fetchHostsWithCounts = async (q, page) => {
  const regex = new RegExp(q, "i");

  const ITEM_PER_PAGE = 10;
  try {
    connectToDB();

    const aggregation = await Host.aggregate([
      {
        $match: {
          strain: { $regex: regex },
        },
      },
      {
        $lookup: {
          from: "phages", // The name of the phage collection in the database
          localField: "_id",
          foreignField: "source.isolation_host.host_id", // Reference to the nested field
          as: "phages",
        },
      },
      {
        $project: {
          strain: 1,
          full_name: 1,
          source: 1,
          phageCount: { $size: "$phages" },
        },
      },
      {
        $sort: {
          phageCount: -1,
        },
      },
      {
        $facet: {
          metadata: [{ $count: "total" }],
          data: [
            { $skip: ITEM_PER_PAGE * (page - 1) },
            { $limit: ITEM_PER_PAGE },
          ],
        },
      },
    ]);

    const rtnData = aggregation[0];
    const hosts = rtnData["data"];
    const count = rtnData["metadata"]?.[0]?.["total"] || 0;

    return { count, hosts };
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch hosts", error);
  }
};

export const fetchHost = async (id) => {
  try {
    connectToDB();
    const host = await Host.findById(id);
    return host;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch host", error);
  }
};

export const addHost = async (formData) => {
  const {
    short_name,
    genus,
    species,
    strain,
    institution,
    contact_email,
    reason,
    external_url,
  } = Object.fromEntries(formData);

  const mod_species = `${genus} ${species}`;
  const mod_strain = `${mod_species} ${strain}`;

  try {
    connectToDB();
    const newHost = new Host({
      short_name,
      genus,
      species: mod_species,
      strain: mod_strain,
      source: {
        reason,
        institution,
        contact_email,
      },
      reference_genome: {
        uri: external_url,
        format: "external_url",
      },
    });

    await newHost.save();
  } catch (error) {
    console.log(error);
    throw new Error("Failed to create host");
  }

  revalidatePath("/dashboard/hosts");
  redirect("/dashboard/hosts");
};
