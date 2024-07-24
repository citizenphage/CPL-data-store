import { Sample, User } from "./models";
import { connectToDB } from "./utils";

export const fetchUsers = async (q) => {
  const regex = new RegExp(q, "i");
  try {
    connectToDB();
    const users = await User.find({ firstname: { $regex: regex } });
    return users;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch users", error);
  }
};

export const fetchUser = async (id) => {
  try {
    connectToDB();
    const user = await User.findById(id);
    return user;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch user", error);
  }
};

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
