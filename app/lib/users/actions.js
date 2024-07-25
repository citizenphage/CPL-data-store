/* all this code runs on the server side due to the use server line */
"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { User } from "../models";
import { connectToDB } from "../utils";
import bcrypt from "bcrypt";

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

export const addUser = async (formData) => {
  const { firstname, lastname, email, password, isActive } =
    Object.fromEntries(formData);

  try {
    connectToDB();
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      isActive,
    });

    await newUser.save();
  } catch (error) {
    console.log(error);
    throw new Error("Failed to create user");
  }

  revalidatePath("/dashboard/admin/users");
  redirect("/dashboard/admin/users");
};

export const updateUser = async (formData) => {
  const { id, firstname, lastname, email, password, isActive } =
    Object.fromEntries(formData);

  try {
    connectToDB();
    const updateFields = {
      firstname,
      lastname,
      email,
      password,
      isActive,
    };

    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || undefined) && delete updateFields[key]
    );

    await User.findByIdAndUpdate(id, updateFields);
  } catch (error) {
    console.log(error);
    throw new Error("Failed to update user");
  }

  revalidatePath("/dashboard/admin/users");
  redirect("/dashboard/admin/users");
};

export const deleteUser = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDB();
    await User.findByIdAndDelete(id);
  } catch (error) {
    console.log(error);
    throw new Error("Failed to delete user");
  }

  revalidatePath("/dashboard/admin/users");
};
