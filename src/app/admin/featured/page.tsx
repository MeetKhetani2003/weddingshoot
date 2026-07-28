"use client";
import { useState, useEffect } from "react";

type Orientation = "vertical" | "horizontal" | "auto";

interface FeaturedItem {
  _id: string;
  title: string;
  categoryLabel: string;
  location: string;
  imageId: string;
  orientation?: Orientation;
  order: number;
}

const ORIENTATION_OPTIONS: { value: Orientation; label: string; icon: string }[] = [
  { value: "auto",       label: "Auto",       icon: "⚡" },
  { value: "vertical",   label: "Vertical",   icon: "📱" },
  { value: "horizontal", label: "Horizontal", icon: "🖥️" },
];

export default function FeaturedGalleryPage() {
  const [items, setItems] = useState<FeaturedItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [savingId, setSavingId] = useState<string | null>(null);

  // Form state
  const [title, setTitle] = useState("");
  const [categoryLabel, setCategoryLabel] = useState("");
  const [location, setLocation] = useState("");
  const [orientation, setOrientation] = useState<Orientation>("auto");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const fetchItems = async () => {
    const res = await fetch("/api/admin/featured");
    if (res.ok) setItems(await res.json());
  };

  useEffect(() => { fetchItems(); }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setPreview(ev.target?.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) return alert("Please select an image.");
    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("categoryLabel", categoryLabel);
    formData.append("location", location);
    formData.append("orientation", orientation);
    formData.append("image", image);

    const res = await fetch("/api/admin/featured", { method: "POST", body: formData });
    if (res.ok) {
      setTitle(""); setCategoryLabel(""); setLocation("");
      setOrientation("auto"); setImage(null); setPreview(null);
      fetchItems();
    } else {
      alert("Upload failed. Please try again.");
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this featured item? This cannot be undone.")) return;
    await fetch(`/api/admin/featured/${id}`, { method: "DELETE" });
    fetchItems();
  };

  const handleOrientationChange = async (id: string, newOrientation: Orientation) => {
    setSavingId(id);
    setItems((prev) =>
      prev.map((item) => item._id === id ? { ...item, orientation: newOrientation } : item)
    );
    await fetch(`/api/admin/featured/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orientation: newOrientation }),
    });
    setSavingId(null);
  };

  const handleFieldUpdate = async (id: string, field: string, value: string) => {
    setSavingId(id);
    setItems((prev) =>
      prev.map((item) => item._id === id ? { ...item, [field]: value } : item)
    );
    await fetch(`/api/admin/featured/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ [field]: value }),
    });
    setSavingId(null);
  };

  const moveItem = async (id: string, direction: "up" | "down") => {
    const idx = items.findIndex((i) => i._id === id);
    if (direction === "up" && idx === 0) return;
    if (direction === "down" && idx === items.length - 1) return;

    const newItems = [...items];
    const swapIdx = direction === "up" ? idx - 1 : idx + 1;
    [newItems[idx], newItems[swapIdx]] = [newItems[swapIdx], newItems[idx]];
    setItems(newItems);

    // Persist new orders
    await Promise.all(
      newItems.map((item, i) =>
        fetch(`/api/admin/featured/${item._id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ order: i }),
        })
      )
    );
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-12">
      <h1 className="text-3xl h-display">Featured Celebrations &amp; Stories</h1>
      <p className="text-bone/50 text-sm -mt-8">
        Manage the gallery section on the homepage. Each item shows as a card with orientation support.
      </p>

      {/* ── Upload Form ── */}
      <section className="bg-zinc-900 p-8 border border-bone/10 space-y-6">
        <h2 className="text-xl h-display border-b border-bone/10 pb-4">Add New Item</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="md:col-span-1">
              <label className="block text-xs uppercase tracking-widest text-bone mb-2">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="e.g. The Royal Udaipur Vows"
                className="w-full bg-black/50 border border-bone/20 p-2.5 text-bone focus:border-bone outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-bone mb-2">Category Label</label>
              <input
                type="text"
                value={categoryLabel}
                onChange={(e) => setCategoryLabel(e.target.value)}
                required
                placeholder="e.g. Wedding, Maternity, Decor…"
                className="w-full bg-black/50 border border-bone/20 p-2.5 text-bone focus:border-bone outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-bone mb-2">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
                placeholder="e.g. Jagmandir Island Palace, Udaipur"
                className="w-full bg-black/50 border border-bone/20 p-2.5 text-bone focus:border-bone outline-none transition-colors"
              />
            </div>
          </div>

          {/* Orientation */}
          <div>
            <label className="block text-xs uppercase tracking-widest text-bone mb-2">Image Layout</label>
            <div className="flex gap-2">
              {ORIENTATION_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setOrientation(opt.value)}
                  className={`flex items-center gap-1.5 px-4 py-2 text-xs border transition-all duration-200
                    ${orientation === opt.value
                      ? "bg-bone text-ink border-bone font-semibold"
                      : "bg-transparent text-bone/60 border-bone/20 hover:border-bone/60 hover:text-bone"
                    }`}
                >
                  <span>{opt.icon}</span>
                  <span className="uppercase tracking-wider text-[10px]">{opt.label}</span>
                </button>
              ))}
            </div>
            <p className="mt-1 text-[10px] text-bone/30">
              Auto = detect from image · Vertical = portrait (1 col) · Horizontal = landscape (2 col)
            </p>
          </div>

          {/* Image upload with preview */}
          <div>
            <label className="block text-xs uppercase tracking-widest text-bone mb-2">Image</label>
            <div className="flex gap-4 items-start">
              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-24 h-32 object-cover border border-bone/20 rounded-sm shrink-0"
                />
              )}
              <div className="flex-1 border border-dashed border-bone/30 p-4 hover:bg-bone/5 transition-colors relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  required
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <p className="text-bone/50 text-sm text-center">
                  {image ? image.name : "Click to choose image"}
                </p>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-bone text-ink px-8 py-2.5 uppercase text-xs tracking-widest hover:bg-bone/80 transition-colors font-bold"
          >
            {loading ? "Uploading..." : "+ Add to Featured Gallery"}
          </button>
        </form>
      </section>

      {/* ── Item Grid ── */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl h-display">
            Existing Items
            <span className="ml-2 text-sm font-sans text-bone/40">({items.length})</span>
          </h2>
          <p className="text-[11px] text-bone/40">Use ↑ ↓ arrows to reorder • changes save instantly</p>
        </div>

        {items.length === 0 && (
          <div className="border border-bone/10 p-12 text-center text-bone/40">
            No items yet. Add one above.
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, idx) => {
            const current: Orientation = item.orientation ?? "auto";
            return (
              <div key={item._id} className="bg-zinc-900 border border-bone/10 flex flex-col group relative">
                {/* Image */}
                <div className="relative overflow-hidden bg-black/40" style={{ aspectRatio: current === "horizontal" ? "16/9" : "3/4" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/api/images/${item.imageId}`}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Reorder arrows */}
                  <div className="absolute top-2 left-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => moveItem(item._id, "up")}
                      disabled={idx === 0}
                      className="w-7 h-7 flex items-center justify-center bg-black/70 text-bone hover:bg-bone hover:text-ink disabled:opacity-30 text-xs transition-colors"
                    >↑</button>
                    <button
                      onClick={() => moveItem(item._id, "down")}
                      disabled={idx === items.length - 1}
                      className="w-7 h-7 flex items-center justify-center bg-black/70 text-bone hover:bg-bone hover:text-ink disabled:opacity-30 text-xs transition-colors"
                    >↓</button>
                  </div>
                  {/* Delete */}
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="absolute top-2 right-2 bg-red-500/90 text-white text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    Delete
                  </button>
                  {/* Order badge */}
                  <span className="absolute bottom-2 right-2 bg-ink/70 text-bone text-[9px] uppercase tracking-widest px-2 py-0.5">
                    #{idx + 1}
                  </span>
                </div>

                {/* Editable fields */}
                <div className="p-4 space-y-3 flex-1">
                  <div>
                    <label className="block text-[9px] uppercase tracking-widest text-bone/40 mb-1">Title</label>
                    <input
                      type="text"
                      defaultValue={item.title}
                      onBlur={(e) => {
                        if (e.target.value !== item.title)
                          handleFieldUpdate(item._id, "title", e.target.value);
                      }}
                      className="w-full bg-black/40 border border-bone/15 px-2 py-1.5 text-sm text-bone outline-none focus:border-bone/50 transition-colors"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[9px] uppercase tracking-widest text-bone/40 mb-1">Category</label>
                      <input
                        type="text"
                        defaultValue={item.categoryLabel}
                        onBlur={(e) => {
                          if (e.target.value !== item.categoryLabel)
                            handleFieldUpdate(item._id, "categoryLabel", e.target.value);
                        }}
                        className="w-full bg-black/40 border border-bone/15 px-2 py-1.5 text-xs text-bone outline-none focus:border-bone/50 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] uppercase tracking-widest text-bone/40 mb-1">Location</label>
                      <input
                        type="text"
                        defaultValue={item.location}
                        onBlur={(e) => {
                          if (e.target.value !== item.location)
                            handleFieldUpdate(item._id, "location", e.target.value);
                        }}
                        className="w-full bg-black/40 border border-bone/15 px-2 py-1.5 text-xs text-bone outline-none focus:border-bone/50 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Orientation toggle */}
                  <div>
                    <label className="block text-[9px] uppercase tracking-widest text-bone/40 mb-1.5">Image Layout</label>
                    <div className="flex gap-1">
                      {ORIENTATION_OPTIONS.map((opt) => {
                        const isActive = current === opt.value;
                        return (
                          <button
                            key={opt.value}
                            onClick={() => handleOrientationChange(item._id, opt.value)}
                            disabled={savingId === item._id}
                            title={opt.label}
                            className={`flex items-center gap-1 px-2 py-1 text-[9px] border transition-all duration-200 flex-1 justify-center
                              ${isActive
                                ? "bg-bone text-ink border-bone font-bold"
                                : "bg-transparent text-bone/50 border-bone/15 hover:border-bone/50 hover:text-bone"
                              }
                              ${savingId === item._id ? "opacity-40 cursor-wait" : "cursor-pointer"}
                            `}
                          >
                            <span>{opt.icon}</span>
                            <span className="uppercase tracking-wider hidden sm:inline text-[8px]">{opt.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Saving indicator */}
                {savingId === item._id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-bone/40 animate-pulse" />
                )}
              </div>
            );
          })}
        </div>

        {/* Legend */}
        {items.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-5 text-[11px] text-bone/40">
            <span>⚡ <strong className="text-bone/60">Auto</strong> — detect from image size</span>
            <span>📱 <strong className="text-bone/60">Vertical</strong> — portrait, takes 1 column</span>
            <span>🖥️ <strong className="text-bone/60">Horizontal</strong> — landscape, takes 2 columns</span>
            <span className="text-bone/30">Tip: click any text field and click away to save edits inline</span>
          </div>
        )}
      </section>
    </div>
  );
}
