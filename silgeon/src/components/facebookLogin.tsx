"use client";

import { createClient } from "@/utils/client";

const FacebookLogin = (): JSX.Element => {
  const facebook = async () => {
    const supabase = createClient();
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "facebook",
      options: {
        redirectTo: "http://localhost:3000/auth/callback",
      },
    });
  };

  return (
    <>
      <button onClick={facebook}>페북로그인</button>
    </>
  );
};
export default FacebookLogin;
