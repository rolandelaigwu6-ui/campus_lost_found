"use client";
import { useState } from "react";
import { useAuth } from "@/lib/context/AuthContext";
import { useToast } from "@/lib/context/ToastContext";
import Button from "@/components/ui/Button";

export default function ProfilePage() {
  const { user, logout, refreshUser } = useAuth();
  const { toast } = useToast();
  const [editing, setEditing] = useState(false);

  if (!user) return null;

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
      <h1 className="text-2xl font-bold text-text">Profile</h1>

      <div className="mt-6 rounded-xl border border-border bg-bg p-6">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-light text-xl font-bold text-primary">
            {user.fullName.charAt(0)}
          </div>
          <div>
            <p className="font-semibold text-text">{user.fullName}</p>
            <p className="text-sm text-text-secondary">{user.email}</p>
          </div>
        </div>

        <dl className="mt-6 space-y-4 border-t border-border pt-4">
          <div className="flex justify-between">
            <dt className="text-sm text-text-secondary">Cluster</dt>
            <dd className="text-sm font-medium text-text">{user.Cluster ?? "Not set"}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-sm text-text-secondary">Phone</dt>
            <dd className="text-sm font-medium text-text">{user.phone ?? "Not set"}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-sm text-text-secondary">Role</dt>
            <dd className="text-sm font-medium text-text capitalize">{user.role}</dd>
          </div>
        </dl>

        <div className="mt-6 flex gap-3">
          <Button variant="secondary" size="sm" onClick={() => setEditing(!editing)}>
            {editing ? "Cancel" : "Edit Profile"}
          </Button>
          <Button variant="danger" size="sm" onClick={logout}>Log Out</Button>
        </div>
      </div>
    </div>
  );
}
