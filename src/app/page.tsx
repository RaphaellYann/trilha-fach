import { redirect } from "next/navigation";

export default function Home() {
  // Redireciona automaticamente para a trilha ao acessar a raiz (/)
  redirect("/trilha");
}