"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function PortfolioPage() {
  const [items, setItems] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  
  const [title, setTitle] = useState("");
  const [place, setPlace] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    const [resItems, resCats] = await Promise.all([
      fetch("/api/admin/portfolio"),
      fetch("/api/admin/categories")
    ]);
    if (resItems.ok) setItems(await resItems.json());
    if (resCats.ok) {
      const cats = await resCats.json();
      setCategories(cats);
      if (cats.length > 0) setCategoryId(cats[0]._id);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) return alert("Image is required");
    setLoading(true);
    
    const formData = new FormData();
    formData.append("title", title);
    formData.append("place", place);
    formData.append("categoryId", categoryId);
    formData.append("image", image);

    await fetch("/api/admin/portfolio", {
      method: "POST",
      body: formData,
    });
    
    setTitle("");
    setPlace("");
    setImage(null);
    setLoading(false);
    fetchData();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    await fetch(`/api/admin/portfolio/${id}`, { method: "DELETE" });
    fetchData();
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12">
      <div>
        <h1 className="text-3xl h-display mb-8">Manage Portfolio</h1>
        
        <form onSubmit={handleSubmit} className="bg-zinc-900 p-6 border border-bone/10 space-y-4 max-w-2xl">
          <h2 className="text-xl h-display">Upload Image</h2>
          <div className="grid gap-4">
            <div>
              <label className="block text-xs uppercase tracking-widest text-bone mb-2">Title</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full bg-black/50 border border-bone/20 p-2 text-bone focus:border-bone outline-none transition-colors" />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-bone mb-2">Place / Location</label>
              <input type="text" value={place} onChange={(e) => setPlace(e.target.value)} required className="w-full bg-black/50 border border-bone/20 p-2 text-bone focus:border-bone outline-none transition-colors" />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-bone mb-2">Category</label>
              <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required className="w-full bg-black/50 border border-bone/20 p-2 text-bone focus:border-bone outline-none transition-colors">
                {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-bone mb-2">Image</label>
              <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files?.[0] || null)} required className="w-full bg-black/50 border border-bone/20 p-2 text-bone" />
            </div>
          </div>
          <button type="submit" disabled={loading} className="bg-bone text-ink px-6 py-2 uppercase text-xs tracking-widest hover:bg-bone/80 transition-colors">
            {loading ? "Uploading..." : "Upload"}
          </button>
        </form>
      </div>

      <div>
        <h2 className="text-xl h-display mb-4">Portfolio Images</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {items.map((item) => (
            <div key={item._id} className="border border-bone/10 bg-zinc-900 group relative">
              <div className="aspect-square relative overflow-hidden bg-black/50">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/api/images/${item.imageId}`} alt={item.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-4">
                <p className="text-sm uppercase tracking-widest text-bone/70 text-[10px] mb-1">{item.tag}</p>
                <p className="text-lg leading-tight">{item.title}</p>
                <p className="text-xs text-bone/50 mt-1">{item.place}</p>
              </div>
              <button onClick={() => handleDelete(item._id)} className="absolute top-2 right-2 bg-red-500/90 text-white text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
