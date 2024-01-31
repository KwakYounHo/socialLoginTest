import { createClient } from "@/utils/server";
import { cookies } from "next/headers";

export default async function Home(): Promise<JSX.Element> {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data: notes } = await supabase.from("notes").select();
  return (
    <>
      <pre>{JSON.stringify(notes, null, 2)}</pre>
    </>
  );
}
