// src/app/page.tsx
import { redirect } from "next/navigation";

export default function Home() {
  redirect("/trilha"); // Isso força o usuário a ir para onde tem menu
}