"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { itemsApi } from "@/lib/api";
import { useToast } from "@/lib/context/ToastContext";
import { CATEGORIES } from "@/lib/utils/helpers";
import ImageUpload from "@/components/items/ImageUpload";
import Button from "@/components/ui/Button";
import type { ItemCategory } from "@/types";

export default function ReportFoundPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [form, setForm] = useState({
    title: "",
    category: "" as ItemCategory | "",
    description: "",
    location: "",
    locationDetail: "",
    dateOccurred: "",
    contactMethod: "email",
    contactValue: "",
  });

  const set = (key: string, val: string) => setForm((p) => ({ ...p, [key]: val }));

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.category) return;
    setLoading(true);
    try {
      await itemsApi.report({
        type: "found",
        category: form.category as ItemCategory,
        title: form.title,
        description: form.description,
        location: form.location,
        locationDetail: form.locationDetail || undefined,
        dateOccurred: form.dateOccurred,
        contactMethod: form.contactMethod,
        contactValue: form.contactValue,
        images: images.length > 0 ? images : undefined,
      });
      toast("success", "Found item reported — thank you!");
      router.push("/search?type=found");
    } catch (err) {
      toast("error", err instanceof Error ? err.message : "Failed to submit report.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
      <h1 className="text-2xl font-bold text-text">Report a Found Item</h1>
      <p className="mt-1 text-sm text-text-secondary">Found something on campus? Report it so the owner can find it.</p>

      <form onSubmit={submit} className="mt-8 space-y-6">
        <div>
          <label className="mb-1 block text-sm font-medium text-text">Title *</label>
          <input required value={form.title} onChange={(e) => set("title", e.target.value)} placeholder="e.g. Blue backpack with Adidas logo" className="input-field" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-text">Category *</label>
          <select required value={form.category} onChange={(e) => set("category", e.target.value)} className="input-field">
            <option value="" disabled>Select a category</option>
            {CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-text">Description *</label>
          <textarea required value={form.description} onChange={(e) => set("description", e.target.value)} rows={4} placeholder="Color, brand, condition, any identifying marks..." className="input-field resize-y leading-relaxed" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-text">Where did you find it? *</label>
            <input required value={form.location} onChange={(e) => set("location", e.target.value)} placeholder="e.g. Science Building" className="input-field" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-text">Specific spot</label>
            <input value={form.locationDetail} onChange={(e) => set("locationDetail", e.target.value)} placeholder="e.g. Lecture hall 201, back row" className="input-field" />
          </div>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-text">When did you find it? *</label>
          <input type="date" required value={form.dateOccurred} onChange={(e) => set("dateOccurred", e.target.value)} className="input-field" />
        </div>

        <ImageUpload images={images} onChange={setImages} />

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-text">How should the owner reach you? *</label>
            <select required value={form.contactMethod} onChange={(e) => set("contactMethod", e.target.value)} className="input-field">
              <option value="email">Email</option>
              <option value="phone">Phone</option>
              <option value="telegram">Telegram</option>
              <option value="whatsapp">WhatsApp</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-text">Contact info *</label>
            <input required value={form.contactValue} onChange={(e) => set("contactValue", e.target.value)} placeholder="Your email, phone, or username" className="input-field" />
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-border pt-6">
          <Button variant="secondary" type="button" onClick={() => router.back()}>Cancel</Button>
          <Button type="submit" loading={loading}>Submit Report</Button>
        </div>
      </form>
    </div>
  );
}
