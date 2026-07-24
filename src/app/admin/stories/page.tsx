"use client";
import { useState, useEffect } from "react";

export default function StoriesPage() {
  const [stories, setStories] = useState<any[]>([]);
  
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [bodyText, setBodyText] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchStories = async () => {
    const res = await fetch("/api/admin/stories");
    if (res.ok) setStories(await res.json());
  };

  useEffect(() => {
    fetchStories();
  }, []);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) return alert("Image is required");
    setLoading(true);
    
    const formData = new FormData();
    formData.append("title", title);
    formData.append("slug", slug);
    formData.append("excerpt", excerpt);
    formData.append("date", date);
    formData.append("category", category);
    formData.append("body", JSON.stringify(bodyText.split('\n').filter(p => p.trim() !== '')));
    formData.append("image", image);

    await fetch("/api/admin/stories", {
      method: "POST",
      body: formData,
    });
    
    setTitle(""); setSlug(""); setExcerpt(""); setDate(""); setCategory(""); setBodyText(""); setImage(null);
    setLoading(false);
    fetchStories();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    await fetch(`/api/admin/stories/${id}`, { method: "DELETE" });
    fetchStories();
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12">
      <div>
        <h1 className="text-3xl h-display mb-8">Manage Wedding Stories</h1>
        
        <form onSubmit={handleSubmit} className="bg-zinc-900 p-6 border border-bone/10 space-y-4 max-w-3xl">
          <h2 className="text-xl h-display">Upload Story</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-xs uppercase tracking-widest text-bone mb-2">Title</label>
              <input type="text" value={title} onChange={handleTitleChange} required className="w-full bg-black/50 border border-bone/20 p-2 text-bone focus:border-bone outline-none transition-colors" />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-xs uppercase tracking-widest text-bone mb-2">Slug</label>
              <input type="text" value={slug} onChange={(e) => setSlug(e.target.value)} required className="w-full bg-black/50 border border-bone/20 p-2 text-bone focus:border-bone outline-none transition-colors" />
            </div>
            <div className="col-span-2">
              <label className="block text-xs uppercase tracking-widest text-bone mb-2">Excerpt</label>
              <input type="text" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} required className="w-full bg-black/50 border border-bone/20 p-2 text-bone focus:border-bone outline-none transition-colors" />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-xs uppercase tracking-widest text-bone mb-2">Date (e.g., January 12, 2026)</label>
              <input type="text" value={date} onChange={(e) => setDate(e.target.value)} required className="w-full bg-black/50 border border-bone/20 p-2 text-bone focus:border-bone outline-none transition-colors" />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-xs uppercase tracking-widest text-bone mb-2">Category</label>
              <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required className="w-full bg-black/50 border border-bone/20 p-2 text-bone focus:border-bone outline-none transition-colors" />
            </div>
            <div className="col-span-2">
              <label className="block text-xs uppercase tracking-widest text-bone mb-2">Body (Paragraphs separated by new lines)</label>
              <textarea value={bodyText} onChange={(e) => setBodyText(e.target.value)} required rows={6} className="w-full bg-black/50 border border-bone/20 p-2 text-bone focus:border-bone outline-none transition-colors" />
            </div>
            <div className="col-span-2">
              <label className="block text-xs uppercase tracking-widest text-bone mb-2">Cover Image</label>
              <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files?.[0] || null)} required className="w-full bg-black/50 border border-bone/20 p-2 text-bone" />
            </div>
          </div>
          <button type="submit" disabled={loading} className="bg-bone text-ink px-6 py-2 uppercase text-xs tracking-widest hover:bg-bone/80 transition-colors">
            {loading ? "Uploading..." : "Upload Story"}
          </button>
        </form>
      </div>

      <div>
        <h2 className="text-xl h-display mb-4">Existing Stories</h2>
        <div className="space-y-4">
          {stories.map((story) => (
            <div key={story._id} className="border border-bone/10 bg-zinc-900 p-4 flex gap-4 items-start relative group">
              <div className="w-32 h-24 shrink-0 bg-black/50 overflow-hidden">
                 {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/api/images/${story.imageId}`} alt={story.title} className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-bone/70 mb-1">{story.category} · {story.date}</p>
                <h3 className="text-xl h-display">{story.title}</h3>
                <p className="text-sm text-bone/60 mt-1 line-clamp-2">{story.excerpt}</p>
              </div>
              <button onClick={() => handleDelete(story._id)} className="absolute top-4 right-4 text-red-500 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
