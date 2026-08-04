"use client";
import { useState, useEffect } from "react";
import SectionControls from "@/components/admin/SectionControls";

export default function OurStoryConfigPage() {
  const [config, setConfig] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  const updateConfig = (newConfig: any) => {
    setConfig(newConfig);
    setIsDirty(true);
  };

  useEffect(() => {
    fetch("/api/admin/our-story-config")
      .then(res => res.json())
      .then(data => {
        setConfig(data);
        setLoading(false);
      });
  }, []);

  const handleUploadImage = async (field: string, e: React.ChangeEvent<HTMLInputElement>) => {
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
      const section = field.split('.')[0];
      const prop = field.split('.')[1];
      
      updateConfig({
        ...config,
        [section]: {
          ...config[section],
          [prop]: imageId
        }
      });
    }
  };

  const handleChapterImageUpload = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
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
      const newChapters = [...config.timeline.chapters];
      newChapters[index].imageId = imageId;
      updateConfig({
        ...config,
        timeline: {
          ...config.timeline,
          chapters: newChapters
        }
      });
    }
  };

  const addChapter = () => {
    updateConfig({
      ...config,
      timeline: {
        ...config.timeline,
        chapters: [...config.timeline.chapters, { year: "", title: "", detail: "", imageId: "" }]
      }
    });
  };

  const removeChapter = (index: number) => {
    const newChapters = [...config.timeline.chapters];
    newChapters.splice(index, 1);
    updateConfig({
      ...config,
      timeline: { ...config.timeline, chapters: newChapters }
    });
  };

  const handleSave = async () => {
    setSaving(true);
    await fetch("/api/admin/our-story-config", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(config)
    });
    setSaving(false);
    setIsDirty(false);
  };

  if (loading) return <div className="text-bone">Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-32">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl h-display">Our Story Page Settings</h1>
          {isDirty && (
            <p className="text-xs text-amber-400 mt-1 flex items-center gap-1.5">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              Unsaved changes
            </p>
          )}
        </div>
        <button 
          onClick={handleSave} 
          disabled={saving || !isDirty}
          className={`px-8 py-3 uppercase text-xs tracking-widest font-bold transition-all duration-200
            ${isDirty
              ? "bg-bone text-ink hover:bg-bone/80 shadow-lg shadow-bone/20"
              : "bg-bone/20 text-bone/40 cursor-not-allowed"
            }`}
        >
          {saving ? "Saving..." : isDirty ? "Save Changes" : "Saved ✓"}
        </button>
      </div>
      
      {/* Hero Section */}
      <section className="bg-zinc-900 p-8 border border-bone/10 space-y-6">
        <h2 className="text-2xl h-display border-b border-bone/10 pb-4">Hero Section</h2>
        <SectionControls 
          title="Hero" 
          configData={config.hero} 
          onChange={(field, val) => updateConfig({ ...config, hero: { ...config.hero, [field]: val } })} 
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-widest text-bone mb-2">Eyebrow Text</label>
              <input 
                type="text" 
                value={config.hero.eyebrow} 
                onChange={e => updateConfig({ ...config, hero: { ...config.hero, eyebrow: e.target.value } })}
                className="w-full bg-black/50 border border-bone/20 p-2 text-bone outline-none" 
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-bone mb-2">Script Title</label>
              <input 
                type="text" 
                value={config.hero.scriptTitle} 
                onChange={e => updateConfig({ ...config, hero: { ...config.hero, scriptTitle: e.target.value } })}
                className="w-full bg-black/50 border border-bone/20 p-2 text-bone outline-none" 
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-bone mb-2">Main Title</label>
              <input 
                type="text" 
                value={config.hero.title} 
                onChange={e => updateConfig({ ...config, hero: { ...config.hero, title: e.target.value } })}
                className="w-full bg-black/50 border border-bone/20 p-2 text-bone outline-none" 
              />
            </div>
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-bone mb-2">Background Image</label>
            <div className="relative w-full h-48 bg-black group border border-bone/20 flex flex-col items-center justify-center">
              {config.hero.imageId ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={`/api/images/${config.hero.imageId}`} alt="Hero" className="w-full h-full object-cover" />
              ) : (
                <span className="text-bone/50 text-xs">Upload Background Image</span>
              )}
              <input type="file" accept="image/*" onChange={(e) => handleUploadImage("hero.imageId", e)} className="absolute inset-0 opacity-0 cursor-pointer" />
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="bg-zinc-900 p-8 border border-bone/10 space-y-6">
        <h2 className="text-2xl h-display border-b border-bone/10 pb-4 flex justify-between items-center">
          <span>Timeline Chapters</span>
          <button onClick={addChapter} className="text-xs uppercase tracking-widest border border-bone/20 px-4 py-2 hover:bg-bone hover:text-ink transition-colors font-sans">+ Add Chapter</button>
        </h2>
        <SectionControls 
          title="Timeline" 
          configData={config.timeline} 
          onChange={(field, val) => updateConfig({ ...config, timeline: { ...config.timeline, [field]: val } })} 
        />
        
        <div className="space-y-8">
          {config.timeline.chapters.map((chapter: any, i: number) => (
            <div key={i} className="bg-black/30 p-6 border border-bone/10 relative">
              <button 
                onClick={() => removeChapter(i)}
                className="absolute top-4 right-4 text-red-500 hover:text-red-400 text-sm"
              >✕ Remove</button>
              
              <div className="flex flex-col md:flex-row gap-6 mt-4">
                <div className="w-48 shrink-0">
                  <label className="block text-xs uppercase tracking-widest text-bone mb-2">Image</label>
                  <div className="relative w-full h-32 bg-black border border-bone/20 flex items-center justify-center">
                    {chapter.imageId ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={`/api/images/${chapter.imageId}`} alt={chapter.title} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-[10px] text-bone/50">Upload Image</span>
                    )}
                    <input type="file" accept="image/*" onChange={(e) => handleChapterImageUpload(i, e)} className="absolute inset-0 opacity-0 cursor-pointer" />
                  </div>
                </div>
                
                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-bone mb-2">Year / Date Text</label>
                      <input 
                        type="text" 
                        value={chapter.year} 
                        onChange={e => {
                          const newChap = [...config.timeline.chapters];
                          newChap[i].year = e.target.value;
                          updateConfig({ ...config, timeline: { ...config.timeline, chapters: newChap } });
                        }}
                        className="w-full bg-black/50 border border-bone/20 p-2 text-bone outline-none font-script text-xl text-gold" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-bone mb-2">Title</label>
                      <input 
                        type="text" 
                        value={chapter.title} 
                        onChange={e => {
                          const newChap = [...config.timeline.chapters];
                          newChap[i].title = e.target.value;
                          updateConfig({ ...config, timeline: { ...config.timeline, chapters: newChap } });
                        }}
                        className="w-full bg-black/50 border border-bone/20 p-2 text-bone outline-none" 
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-bone mb-2">Description</label>
                    <textarea 
                      value={chapter.detail} 
                      onChange={e => {
                        const newChap = [...config.timeline.chapters];
                        newChap[i].detail = e.target.value;
                        updateConfig({ ...config, timeline: { ...config.timeline, chapters: newChap } });
                      }}
                      className="w-full bg-black/50 border border-bone/20 p-2 text-bone outline-none h-24" 
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-zinc-900 p-8 border border-bone/10 space-y-6">
        <h2 className="text-2xl h-display border-b border-bone/10 pb-4">CTA Section</h2>
        <SectionControls 
          title="CTA" 
          configData={config.cta} 
          onChange={(field, val) => updateConfig({ ...config, cta: { ...config.cta, [field]: val } })} 
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase tracking-widest text-bone mb-2">Eyebrow</label>
            <input type="text" value={config.cta.eyebrow} onChange={e => updateConfig({ ...config, cta: { ...config.cta, eyebrow: e.target.value } })} className="w-full bg-black/50 border border-bone/20 p-2 text-bone outline-none" />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-bone mb-2">Title</label>
            <input type="text" value={config.cta.title} onChange={e => updateConfig({ ...config, cta: { ...config.cta, title: e.target.value } })} className="w-full bg-black/50 border border-bone/20 p-2 text-bone outline-none" />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-bone mb-2">Button Label</label>
            <input type="text" value={config.cta.buttonLabel} onChange={e => updateConfig({ ...config, cta: { ...config.cta, buttonLabel: e.target.value } })} className="w-full bg-black/50 border border-bone/20 p-2 text-bone outline-none" />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-bone mb-2">Button Link</label>
            <input type="text" value={config.cta.buttonLink} onChange={e => updateConfig({ ...config, cta: { ...config.cta, buttonLink: e.target.value } })} className="w-full bg-black/50 border border-bone/20 p-2 text-bone outline-none" />
          </div>
        </div>
      </section>

      {/* ── Sticky floating save bar ── */}
      <div
        className={`fixed bottom-0 left-64 right-0 z-50 transition-all duration-300 ${
          isDirty ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="bg-zinc-950 border-t border-bone/20 px-10 py-4 flex items-center justify-between shadow-2xl">
          <div className="flex items-center gap-3">
            <span className="inline-block w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-sm text-bone/70">You have unsaved changes</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => { setConfig(null); setIsDirty(false); setLoading(true); 
                fetch("/api/admin/our-story-config").then(r => r.json()).then(d => { setConfig(d); setLoading(false); }); }}
              className="text-xs uppercase tracking-widest text-bone/50 hover:text-bone transition-colors px-4 py-2 border border-bone/20 hover:border-bone/40"
            >
              Discard
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-bone text-ink px-8 py-2.5 uppercase text-xs tracking-widest font-bold hover:bg-bone/90 transition-colors shadow-lg shadow-bone/20"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
