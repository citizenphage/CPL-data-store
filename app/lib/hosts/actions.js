/* all this code runs on the server side due to the use server line */
"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { Host } from "../models";
import { connectToDB } from "../utils";

export const fetchHosts = async (q) => {
  const regex = new RegExp(q, "i");
  try {
    connectToDB();
    const hosts = await Host.find({ strain: { $regex: regex } });
    return hosts;
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
    throw new Error("Failed to fetch user", error);
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
