import supabase from "../../../services/supaBaseClient"; // Proverite putanju

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
      console.error("Greška pri registraciji:", authError.message);
      alert(`Greška: ${authError.message}`);
      throw new Error(authError.message);
    }

    const userId = authData.user?.id;
    if (!userId) throw new Error("Korisnik nije uspešno kreiran u Authentication.");

    const { data: dbData, error: dbError } = await supabase.from("users").insert([
      {
        id: userId,
        email: authData.user.email,
        username: username,
      },
    ]);

    if (dbError) {
      console.error("Greška pri dodavanju korisnika u tabelu 'users':", dbError.message);
      alert(`Greška u bazi: ${dbError.message}`);
      throw new Error(dbError.message);
    }
    return dbData;
  } catch (err) {
    console.error("Greška pri registraciji i dodavanju u bazu:", err.message);
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
      console.error("Greška pri prijavi:", error.message);
      alert(`Greška: ${error.message}`);
      throw new Error(error.message);
    }

    console.log("Prijava uspešna:", data);
    return data;
  } catch (err) {
    console.error("Greška pri prijavi:", err.message);
    throw err;
  }
}

export async function getCurrentUser() {
  try {
    const { data: session } = await supabase.auth.getSession();
    if (!session?.session) return null;

    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError) throw new Error(userError.message);

    console.log("Trenutni korisnik:", userData.user);
    return userData.user;
  } catch (err) {
    console.error("Greška pri dohvaćanju trenutnog korisnika:", err.message);
    throw err;
  }
}
