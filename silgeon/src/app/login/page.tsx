import { createClient } from "@/utils/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import FacebookLogin from "@/components/facebookLogin";

const Login = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}): Promise<JSX.Element> => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) redirect("/");

  // form action
  const signIn = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return console.log("뭔가 에러");
    }

    const redirectUrl = searchParams.redirectUrl || "/";

    return redirect(redirectUrl);
  };

  return (
    <>
      <form action={signIn} className={"flex flex-col gap-5"}>
        <label htmlFor="email">아이디</label>
        <input
          type={"text"}
          name={"email"}
          placeholder={"example@example.com"}
        />
        <label htmlFor={"password"}>비밀번호</label>
        <input type="password" name={"password"} placeholder={"secret"} />
        <button>로그인</button>
      </form>
      <FacebookLogin />
    </>
  );
};
export default Login;
