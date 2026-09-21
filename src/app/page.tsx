import Link from "next/link";
import { Search, Shield, Zap, Users } from "lucide-react";

const FEATURES = [
  { icon: Search, title: "Quick Search", description: "Find your item fast with filters by category, location, and date." },
  { icon: Zap, title: "Smart Matching", description: "Our system compares lost and found reports to suggest possible matches automatically." },
  { icon: Shield, title: "Verified Campus Users", description: "Only registered students and staff can post — keeping reports trustworthy." },
  { icon: Users, title: "Direct Contact", description: "Connect with the finder directly through your preferred contact method." },
];

const STATS = [
  { label: "Items Reported", value: "—" },
  { label: "Successfully Recovered", value: "—" },
  { label: "Active Users", value: "—" },
];

export default function LandingPage() {
  return (
    <div className="min-h-dvh">
      {/* top nav */}
      <header className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <img
          src="/logo.jpeg"
          alt="Campus Lost & Found Logo"
          className="h-8 w-8 rounded-lg object-cover"
        />
        <span className="font-semibold text-text">Lost & Found</span>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/login" className="rounded-lg px-4 py-2 text-sm font-medium text-text-secondary transition-colors hover:bg-surface">
            Log in
          </Link>
          <Link href="/register" className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-text transition-colors hover:bg-primary-hover">
            Sign up
          </Link>
        </div>
      </header>

      {/* hero */}
      <section className="mx-auto max-w-3xl px-6 py-16 text-center sm:py-24">
        <p className="text-sm font-medium text-primary">Campus Lost & Found System</p>
        <h1 className="mt-3 text-4xl font-bold leading-tight text-text sm:text-5xl">
          Lost something on campus? Find it here.
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-text-secondary">
          Report lost items, browse what's been found, and get matched with your belongings.
          Built for students, by students.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/register" className="w-full rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-text transition-colors hover:bg-primary-hover sm:w-auto">
            Get Started
          </Link>
          <Link href="/search" className="w-full rounded-lg border border-border px-6 py-3 text-sm font-medium text-text transition-colors hover:bg-surface sm:w-auto">
            Browse Items
          </Link>
        </div>
      </section>

      {/* stats */}
      <section className="border-y border-border bg-surface py-8">
        <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-around gap-6 px-6">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-3xl font-bold text-text">{s.value}</p>
              <p className="mt-1 text-sm text-text-secondary">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* features */}
      <section className="mx-auto max-w-5xl px-6 py-16 sm:py-24">
        <h2 className="text-center text-2xl font-bold text-text sm:text-3xl">How it works</h2>
        <div className="mt-12 grid gap-8 sm:grid-cols-2">
          {FEATURES.map((f) => (
            <div key={f.title} className="rounded-xl border border-border p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-light">
                <f.icon size={20} className="text-primary" />
              </div>
              <h3 className="mt-4 font-semibold text-text">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* footer */}
      <footer className="border-t border-border px-6 py-8 text-center text-sm text-text-muted">
        © {new Date().getFullYear()} Campus Lost & Found. All rights reserved.
      </footer>
    </div>
  );
}
