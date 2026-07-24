"use client";
import { useState, useEffect } from "react";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [loading, setLoading] = useState(false);

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
    setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await fetch("/api/admin/categories", {
      method: "POST",
      body: JSON.stringify({ name, slug }),
      headers: { "Content-Type": "application/json" }
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
          <button type="submit" disabled={loading} className="bg-bone text-ink px-6 py-2 uppercase text-xs tracking-widest hover:bg-bone/80 transition-colors">
            {loading ? "Adding..." : "Add Category"}
          </button>
        </form>
      </div>

      <div>
        <h2 className="text-xl h-display mb-4">Existing Categories</h2>
        <div className="border border-bone/10">
          {categories.length === 0 && <p className="p-4 text-bone/50">No categories found.</p>}
          {categories.map((c) => (
            <div key={c._id} className="flex justify-between items-center p-4 border-b border-bone/10 last:border-0">
              <div>
                <p className="text-lg">{c.name}</p>
                <p className="text-xs text-bone/50">{c.slug}</p>
              </div>
              <button 
                onClick={() => handleDelete(c._id)}
                className="text-red-500 text-sm hover:underline"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
