import supabase from "../../../services/supaBaseClient";
import { toast } from "react-hot-toast";

export async function signUp({ username, email, password }) {
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username,
      },
    },
  });

  if (authError) {
    toast.error(`Error: ${authError.message}`);
  }

  const userId = authData.user?.id;
  if (!userId) throw new Error("User was not successfully created in Authentication.");

  const { data: dbData, error: dbError } = await supabase.from("users").insert([
    {
      id: userId,
      email: authData.user.email,
      username: username,
    },
  ]);

  if (dbError) {
    toast.error(`Error: ${dbError.message}`);
  }
  return dbData;
}

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    toast.error(`Error: ${error.message}`);
  }
  return data;
}

export async function getCurrentUser() {
  try {
    const { data: session } = await supabase.auth.getSession();
    if (!session?.session) return null;

    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError) throw new Error(userError.message);

    console.log("Current user:", userData.user.email);
    const currentUser = userData
      ? {
          username: userData.user.user_metadata?.username || "No username",
          email: userData.user.email,
          id: userData.user.id,
        }
      : null;
    return currentUser;
  } catch (err) {
    console.error("Error fetching the current user:", err.message);
    throw err;
  }
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}
