"use client";
import { useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useAuth } from "@/lib/context/AuthContext";
import Button from "@/components/ui/Button";

export default function RegisterPage() {
  const { register } = useAuth();
  const [form, setForm] = useState({ fullName: "", email: "", password: "", Cluster: "", phone: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const set = (key: string, val: string) => setForm((p) => ({ ...p, [key]: val }));

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try { await register(form); }
    catch (err) { setError(err instanceof Error ? err.message : "Registration failed."); }
    finally { setLoading(false); }
  };

  return (
    <div className="flex min-h-dvh items-center justify-center px-6 py-12">
      <div className="w-full max-w-sm">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm text-text-secondary transition-colors hover:bg-surface hover:text-text"
        >
          <ArrowLeft size={16} /> Back
        </Link>

        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-text"><img
            src="/logo.jpeg"
            alt="Campus Lost & Found Logo"
            className="h-8 w-8 rounded-lg object-cover"
            />
          </Link>

          <h1 className="mt-4 text-2xl font-bold text-text">Create an account</h1>
          <p className="mt-1 text-sm text-text-secondary">Join the campus lost & found</p>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-text">Full Name *</label>
            <input required value={form.fullName} onChange={(e) => set("fullName", e.target.value)} className="input-field" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-text">Email *</label>
            <input type="email" required value={form.email} onChange={(e) => set("email", e.target.value)} className="input-field" placeholder="you@campus.edu" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-text">Password *</label>
            <input type="password" required minLength={8} value={form.password} onChange={(e) => set("password", e.target.value)} className="input-field" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-text">Cluster</label>
            <input value={form.Cluster} onChange={(e) => set("Cluster", e.target.value)} className="input-field" placeholder="Optional" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-text">Phone</label>
            <input value={form.phone} onChange={(e) => set("phone", e.target.value)} className="input-field" placeholder="Optional" />
          </div>
          {error && <p className="text-sm text-error">{error}</p>}
          <Button type="submit" loading={loading} className="w-full">Create Account</Button>
        </form>

        <p className="mt-6 text-center text-sm text-text-secondary">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-primary hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
}
