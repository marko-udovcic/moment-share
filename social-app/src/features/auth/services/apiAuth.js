import supabase from "../../../services/supaBaseClient"; // Check the path

export async function signUp({ username, email, password }) {
  try {
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
      console.error("Error during registration:", authError.message);
      alert(`Error: ${authError.message}`);
      throw new Error(authError.message);
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
      console.error("Error adding user to 'users' table:", dbError.message);
      alert(`Database error: ${dbError.message}`);
      throw new Error(dbError.message);
    }
    return dbData;
  } catch (err) {
    console.error("Error during registration and adding to the database:", err.message);
    throw err;
  }
}

export async function login({ email, password }) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Error during login:", error.message);
      alert(`Error: ${error.message}`);
      throw new Error(error.message);
    }

    console.log("Login successful:", data);
    return data;
  } catch (err) {
    console.error("Error during login:", err.message);
    throw err;
  }
}

export async function getCurrentUser() {
  try {
    const { data: session } = await supabase.auth.getSession();
    if (!session?.session) return null;

    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError) throw new Error(userError.message);

    console.log("Current user:", userData.user);
    return userData.user;
  } catch (err) {
    console.error("Error fetching the current user:", err.message);
    throw err;
  }
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}
