"use client";
import { useState, useEffect } from "react";
import { ExploreCards } from "@/components/ui";

export default function HomeConfigPage() {
  const [config, setConfig] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/admin/home-config")
      .then(res => res.json())
      .then(data => {
        setConfig(data);
        setLoading(false);
      });
  }, []);

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch("/api/admin/upload", {
      method: "POST",
      body: formData
    });
    
    if (res.ok) {
      const { imageId } = await res.json();
      setConfig({
        ...config,
        hero: {
          ...config.hero,
          imageIds: [...config.hero.imageIds, imageId]
        }
      });
    }
  };

  const removeHeroImage = (index: number) => {
    const newImages = [...config.hero.imageIds];
    newImages.splice(index, 1);
    setConfig({
      ...config,
      hero: { ...config.hero, imageIds: newImages }
    });
  };

  const handleExploreItemUpload = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch("/api/admin/upload", {
      method: "POST",
      body: formData
    });
    
    if (res.ok) {
      const { imageId } = await res.json();
      const newItems = [...config.explore.items];
      newItems[index].imageId = imageId;
      setConfig({
        ...config,
        explore: { ...config.explore, items: newItems }
      });
    }
  };

  const handleExploreGalleryUpload = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch("/api/admin/upload", {
      method: "POST",
      body: formData
    });
    
    if (res.ok) {
      const { imageId } = await res.json();
      const newItems = [...config.explore.items];
      newItems[index].galleryImageIds = [...(newItems[index].galleryImageIds || []), imageId];
      setConfig({
        ...config,
        explore: { ...config.explore, items: newItems }
      });
    }
  };

  const removeExploreGalleryImage = (itemIndex: number, imgIndex: number) => {
    const newItems = [...config.explore.items];
    newItems[itemIndex].galleryImageIds.splice(imgIndex, 1);
    setConfig({
      ...config,
      explore: { ...config.explore, items: newItems }
    });
  };

  const addExploreItem = () => {
    setConfig({
      ...config,
      explore: {
        ...config.explore,
        items: [...config.explore.items, { label: "", href: "", imageId: "" }]
      }
    });
  };

  const updateExploreItem = (index: number, field: string, value: string) => {
    const newItems = [...config.explore.items];
    newItems[index] = { ...newItems[index], [field]: value };
    setConfig({
      ...config,
      explore: { ...config.explore, items: newItems }
    });
  };

  const removeExploreItem = (index: number) => {
    const newItems = [...config.explore.items];
    newItems.splice(index, 1);
    setConfig({
      ...config,
      explore: { ...config.explore, items: newItems }
    });
  };

  const handleSave = async () => {
    setSaving(true);
    await fetch("/api/admin/home-config", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(config)
    });
    setSaving(false);
    alert("Saved successfully!");
  };

  if (loading) return <div className="text-bone">Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-24">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl h-display">Homepage Settings</h1>
        <button 
          onClick={handleSave} 
          disabled={saving}
          className="bg-bone text-ink px-8 py-3 uppercase text-xs tracking-widest hover:bg-bone/80 transition-colors font-bold"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
      
      {/* Hero Section */}
      <section className="bg-zinc-900 p-8 border border-bone/10 space-y-6">
        <h2 className="text-2xl h-display border-b border-bone/10 pb-4">Hero Section</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs uppercase tracking-widest text-bone mb-2">Subtitle</label>
            <input 
              type="text" 
              value={config.hero.subtitle} 
              onChange={e => setConfig({ ...config, hero: { ...config.hero, subtitle: e.target.value } })}
              className="w-full bg-black/50 border border-bone/20 p-2 text-bone outline-none" 
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-bone mb-2">Title</label>
            <input 
              type="text" 
              value={config.hero.title} 
              onChange={e => setConfig({ ...config, hero: { ...config.hero, title: e.target.value } })}
              className="w-full bg-black/50 border border-bone/20 p-2 text-bone outline-none" 
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-bone mb-2">Title Highlight Word</label>
            <input 
              type="text" 
              value={config.hero.titleHighlight} 
              onChange={e => setConfig({ ...config, hero: { ...config.hero, titleHighlight: e.target.value } })}
              className="w-full bg-black/50 border border-bone/20 p-2 text-bone outline-none" 
            />
          </div>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-widest text-bone mb-4 mt-6">Carousel Images</label>
          <div className="flex flex-wrap gap-4 mb-4">
            {config.hero.imageIds.map((id: string, i: number) => (
              <div key={i} className="relative w-32 h-48 bg-black group border border-bone/20">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/api/images/${id}`} alt="Hero" className="w-full h-full object-cover opacity-80" />
                <button 
                  onClick={() => removeHeroImage(i)}
                  className="absolute top-2 right-2 bg-red-500 text-white text-xs p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >✕</button>
              </div>
            ))}
            <div className="w-32 h-48 border border-dashed border-bone/30 flex flex-col items-center justify-center relative hover:bg-bone/5 cursor-pointer transition-colors">
              <span className="text-bone/50 text-xs uppercase">+ Add Image</span>
              <input type="file" accept="image/*" onChange={handleUploadImage} className="absolute inset-0 opacity-0 cursor-pointer" />
            </div>
          </div>
        </div>
      </section>

      {/* Explore Section */}
      <section className="bg-zinc-900 p-8 border border-bone/10 space-y-6">
        <h2 className="text-2xl h-display border-b border-bone/10 pb-4">Explore Our World Layout</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-xs uppercase tracking-widest text-bone mb-2">Layout Mode</label>
            <select 
              value={config.explore.layout}
              onChange={e => setConfig({ ...config, explore: { ...config.explore, layout: e.target.value } })}
              className="w-full bg-black/50 border border-bone/20 p-2 text-bone outline-none"
            >
              <option value="carousel">Swipe Carousel</option>
              <option value="grid">Grid</option>
            </select>
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-bone mb-2">Card Shape</label>
            <select 
              value={config.explore.cardShape}
              onChange={e => setConfig({ ...config, explore: { ...config.explore, cardShape: e.target.value } })}
              className="w-full bg-black/50 border border-bone/20 p-2 text-bone outline-none"
            >
              <option value="portrait">Portrait</option>
              <option value="square">Square</option>
              <option value="landscape">Landscape</option>
              <option value="circle">Circle</option>
            </select>
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-bone mb-2">Spacing</label>
            <select 
              value={config.explore.spacing}
              onChange={e => setConfig({ ...config, explore: { ...config.explore, spacing: e.target.value } })}
              className="w-full bg-black/50 border border-bone/20 p-2 text-bone outline-none"
            >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>
        </div>

        <div className="mt-8">
          <div className="flex justify-between items-center mb-4 mt-8">
            <h3 className="text-xl h-display">Explore Items</h3>
            <button onClick={addExploreItem} className="text-xs uppercase tracking-widest border border-bone/20 px-4 py-2 hover:bg-bone hover:text-ink transition-colors">+ Add Item</button>
          </div>
          
          <div className="space-y-4">
            {config.explore.items.map((item: any, i: number) => (
              <div key={i} className="flex flex-col gap-4 bg-black/30 p-4 border border-bone/10">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-black shrink-0 relative border border-bone/20">
                    {item.imageId ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={`/api/images/${item.imageId}`} alt="img" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[10px] text-bone/50 text-center">No Image</div>
                    )}
                    <input type="file" accept="image/*" onChange={(e) => handleExploreItemUpload(i, e)} className="absolute inset-0 opacity-0 cursor-pointer" />
                  </div>
                  
                  <div className="flex-1 grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-bone/50 mb-1">Label (e.g. Wedding Photography)</label>
                      <input type="text" value={item.label} onChange={e => updateExploreItem(i, "label", e.target.value)} className="w-full bg-black/50 border border-bone/20 p-2 text-bone outline-none text-sm" placeholder="e.g. Wedding" />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-bone/50 mb-1">Link URL</label>
                      <input type="text" value={item.href} onChange={e => updateExploreItem(i, "href", e.target.value)} className="w-full bg-black/50 border border-bone/20 p-2 text-bone outline-none text-sm" placeholder="/wedding-photography" />
                    </div>
                  </div>
                  
                  <button onClick={() => removeExploreItem(i)} className="text-red-500 hover:text-red-400 p-2">✕</button>
                </div>
                
                {/* Gallery Images Section */}
                <div className="border-t border-bone/10 pt-4 mt-2">
                  <label className="block text-[10px] uppercase tracking-widest text-bone/50 mb-3">Service Gallery Images (Shows on {item.href || 'service'} page)</label>
                  <div className="flex flex-wrap gap-2">
                    {(item.galleryImageIds || []).map((id: string, imgIdx: number) => (
                      <div key={imgIdx} className="relative w-16 h-16 bg-black group border border-bone/20">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={`/api/images/${id}`} alt="Gallery" className="w-full h-full object-cover opacity-80" />
                        <button 
                          onClick={() => removeExploreGalleryImage(i, imgIdx)}
                          className="absolute top-1 right-1 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >✕</button>
                      </div>
                    ))}
                    <div className="w-16 h-16 border border-dashed border-bone/30 flex flex-col items-center justify-center relative hover:bg-bone/5 cursor-pointer transition-colors">
                      <span className="text-bone/50 text-xl leading-none">+</span>
                      <input type="file" accept="image/*" onChange={(e) => handleExploreGalleryUpload(i, e)} className="absolute inset-0 opacity-0 cursor-pointer" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {config.explore.items.length === 0 && <p className="text-bone/50 text-sm">No items added yet.</p>}
          </div>
        </div>
      </section>

      {/* Live Preview */}
      <section className="bg-zinc-900 p-8 border border-bone/10 space-y-6 overflow-hidden">
        <h2 className="text-2xl h-display border-b border-bone/10 pb-4">Live Preview</h2>
        <div className="bg-bone py-12 -mx-8 px-8 border border-ink/10">
          {config.explore.items.length > 0 ? (
            <ExploreCards 
              items={config.explore.items.map((i: any) => ({ 
                ...i, 
                image: i.imageId ? `/api/images/${i.imageId}` : "/12.jpg" 
              }))} 
              layout={config.explore.layout}
              cardShape={config.explore.cardShape}
              spacing={config.explore.spacing}
            />
          ) : (
            <p className="text-center text-ink/50 text-sm">Add items to see preview</p>
          )}
        </div>
      </section>
    </div>
  );
}
