"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    if (res.ok) {
      router.push("/admin/home");
    } else {
      const data = await res.json();
      setError(data.error || "Login failed");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-ink">
      <div className="bg-black/40 p-10 border border-bone/10 w-full max-w-md">
        <h1 className="h-display text-4xl text-bone mb-8 text-center">Admin Portal</h1>
        <form onSubmit={handleLogin} className="space-y-6">
          {error && <div className="bg-red-900/50 text-red-200 p-3 text-sm border border-red-500/50">{error}</div>}
          <div>
            <label className="block text-xs uppercase tracking-widest text-bone mb-2">Username</label>
            <input 
              type="text" 
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="w-full bg-black/50 border border-bone/20 p-3 text-bone outline-none focus:border-gold transition-colors"
              required
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-bone mb-2">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-black/50 border border-bone/20 p-3 text-bone outline-none focus:border-gold transition-colors"
              required
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-bone text-ink py-4 uppercase tracking-[0.3em] text-xs font-bold hover:bg-gold transition-colors"
          >
            {loading ? "Authenticating..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
