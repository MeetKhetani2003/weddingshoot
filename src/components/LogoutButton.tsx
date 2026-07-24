"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    router.push("/login");
  };

  return (
    <button 
      onClick={handleLogout}
      className="text-sm text-red-500/70 hover:text-red-400 text-left w-full mt-4"
    >
      Logout
    </button>
  );
}
