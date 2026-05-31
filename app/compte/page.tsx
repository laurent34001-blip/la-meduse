import { redirect } from "next/navigation";

export default function AccountPage() {
  redirect("/connexion?next=/compte");
}
