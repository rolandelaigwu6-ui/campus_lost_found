"use client";

import { useRef, useState, type DragEvent } from "react";
import { Camera, X } from "lucide-react";
import { compressImage } from "@/lib/utils/helpers";

const MAX_FILES = 4;

export default function ImageUpload({
  images,
  onChange,
}: {
  images: File[];
  onChange: (files: File[]) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const addFiles = async (incoming: FileList | File[]) => {
    const files = Array.from(incoming).filter((f) => f.type.startsWith("image/"));
    const remaining = MAX_FILES - images.length;
    const toAdd = files.slice(0, remaining);
    const compressed = await Promise.all(toAdd.map((f) => compressImage(f)));
    onChange([...images, ...compressed]);
  };

  const removeFile = (index: number) => {
    onChange(images.filter((_, i) => i !== index));
  };

  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files) addFiles(e.dataTransfer.files);
  };

  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-text">
        Photos <span className="text-text-muted">(up to {MAX_FILES})</span>
      </label>

      {images.length > 0 && (
        <div className="mb-3 flex gap-2 overflow-x-auto">
          {images.map((file, i) => (
            <div key={i} className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border border-border">
              <img src={URL.createObjectURL(file)} alt="" className="h-full w-full object-cover" />
              <button
                type="button"
                onClick={() => removeFile(i)}
                className="absolute right-1 top-1 rounded-full bg-black/60 p-0.5 text-white transition-colors hover:bg-error"
              >
                <X size={12} />
              </button>
            </div>
          ))}
        </div>
      )}

      {images.length < MAX_FILES && (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          onClick={() => inputRef.current?.click()}
          className={`flex cursor-pointer flex-col items-center gap-1.5 rounded-lg border border-dashed px-4 py-6 text-center transition-colors ${
            dragging ? "border-primary bg-primary-light" : "border-border-strong hover:border-primary"
          }`}
        >
          <Camera size={20} className="text-text-muted" />
          <p className="text-sm text-text-secondary">
            <span className="text-primary">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-text-muted">JPG, PNG — images are compressed automatically</p>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => e.target.files && addFiles(e.target.files)}
          />
        </div>
      )}
    </div>
  );
}
