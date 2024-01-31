import { createClient } from "@/utils/server";
import { cookies, headers } from "next/headers";
import Link from "next/link";

const Header = async (): Promise<JSX.Element> => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const signOut = async () => {
    "use server";
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    await supabase.auth.signOut();
  };

  return user ? (
    <div>
      <p>안녕! {user.email}</p>
      <form action={signOut}>
        <button>로그아웃</button>
      </form>
    </div>
  ) : (
    <Link href={"/login"}>로그인</Link>
  );
};
export default Header;
