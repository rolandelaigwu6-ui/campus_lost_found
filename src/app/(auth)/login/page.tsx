"use client";
import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/context/AuthContext";
import Button from "@/components/ui/Button";

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try { await login(email, password); }
    catch (err) { setError(err instanceof Error ? err.message : "Login failed."); }
    finally { setLoading(false); }
  };

  return (
    <div className="flex min-h-dvh items-center justify-center px-6 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-text">LF</Link>
          <h1 className="mt-4 text-2xl font-bold text-text">Welcome back</h1>
          <p className="mt-1 text-sm text-text-secondary">Log in to your account</p>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-text">Email</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="input-field" placeholder="you@campus.edu" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-text">Password</label>
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="input-field" />
          </div>
          {error && <p className="text-sm text-error">{error}</p>}
          <Button type="submit" loading={loading} className="w-full">Log in</Button>
        </form>

        <p className="mt-6 text-center text-sm text-text-secondary">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-medium text-primary hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
