"use client";
import { useState, useEffect } from "react";

type Orientation = "vertical" | "horizontal" | "auto";

interface Category {
  _id: string;
  name: string;
  slug: string;
  defaultOrientation?: Orientation;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [loading, setLoading] = useState(false);
  const [savingId, setSavingId] = useState<string | null>(null);

  const fetchCategories = async () => {
    const res = await fetch("/api/admin/categories");
    if (res.ok) setCategories(await res.json());
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setName(val);
    setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, ""));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await fetch("/api/admin/categories", {
      method: "POST",
      body: JSON.stringify({ name, slug }),
      headers: { "Content-Type": "application/json" },
    });
    setName("");
    setSlug("");
    setLoading(false);
    fetchCategories();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    await fetch(`/api/admin/categories/${id}`, { method: "DELETE" });
    fetchCategories();
  };

  const handleOrientationChange = async (id: string, orientation: Orientation) => {
    setSavingId(id);
    // Optimistic update
    setCategories((prev) =>
      prev.map((c) => (c._id === id ? { ...c, defaultOrientation: orientation } : c))
    );
    await fetch(`/api/admin/categories/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ defaultOrientation: orientation }),
    });
    setSavingId(null);
  };

  const orientationOptions: { value: Orientation; label: string; icon: string }[] = [
    { value: "auto", label: "Auto", icon: "⚡" },
    { value: "vertical", label: "Vertical", icon: "📱" },
    { value: "horizontal", label: "Horizontal", icon: "🖥️" },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div>
        <h1 className="text-3xl h-display mb-8">Manage Categories</h1>

        <form onSubmit={handleSubmit} className="bg-zinc-900 p-6 border border-bone/10 space-y-4">
          <h2 className="text-xl h-display">Add Category</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-widest text-bone mb-2">Name</label>
              <input
                type="text"
                value={name}
                onChange={handleNameChange}
                required
                className="w-full bg-black/50 border border-bone/20 p-2 text-bone focus:border-bone outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-bone mb-2">Slug</label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                required
                className="w-full bg-black/50 border border-bone/20 p-2 text-bone focus:border-bone outline-none transition-colors"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-bone text-ink px-6 py-2 uppercase text-xs tracking-widest hover:bg-bone/80 transition-colors"
          >
            {loading ? "Adding..." : "Add Category"}
          </button>
        </form>
      </div>

      <div>
        <h2 className="text-xl h-display mb-4">Existing Categories</h2>
        <div className="border border-bone/10 divide-y divide-bone/10">
          {categories.length === 0 && (
            <p className="p-4 text-bone/50">No categories found.</p>
          )}
          {categories.map((c) => {
            const current: Orientation = c.defaultOrientation ?? "auto";
            return (
              <div
                key={c._id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4"
              >
                {/* Left: name + slug */}
                <div className="min-w-0">
                  <p className="text-lg">{c.name}</p>
                  <p className="text-xs text-bone/50">{c.slug}</p>
                </div>

                {/* Middle: orientation toggle */}
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase tracking-widest text-bone/40 mr-1">
                    Image&nbsp;Layout
                  </span>
                  {orientationOptions.map((opt) => {
                    const isActive = current === opt.value;
                    return (
                      <button
                        key={opt.value}
                        onClick={() => handleOrientationChange(c._id, opt.value)}
                        disabled={savingId === c._id}
                        title={opt.label}
                        className={`
                          flex items-center gap-1.5 px-3 py-1.5 text-xs border transition-all duration-200
                          ${isActive
                            ? "bg-bone text-ink border-bone font-semibold"
                            : "bg-transparent text-bone/60 border-bone/20 hover:border-bone/60 hover:text-bone"
                          }
                          ${savingId === c._id ? "opacity-50 cursor-wait" : "cursor-pointer"}
                        `}
                      >
                        <span>{opt.icon}</span>
                        <span className="hidden sm:inline uppercase tracking-wider text-[10px]">
                          {opt.label}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Right: delete */}
                <button
                  onClick={() => handleDelete(c._id)}
                  className="text-red-500 text-sm hover:underline shrink-0"
                >
                  Delete
                </button>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-4 flex flex-wrap gap-4 text-[11px] text-bone/40">
          <span>⚡ <strong className="text-bone/60">Auto</strong> — detect from each image</span>
          <span>📱 <strong className="text-bone/60">Vertical</strong> — show all images in portrait</span>
          <span>🖥️ <strong className="text-bone/60">Horizontal</strong> — show all images in landscape</span>
        </div>
      </div>
    </div>
  );
}
