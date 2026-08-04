"use client";
import { useState, useEffect } from "react";
import SectionControls from "@/components/admin/SectionControls";

export default function AboutConfigPage() {
  const [config, setConfig] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  const updateConfig = (newConfig: any) => {
    setConfig(newConfig);
    setIsDirty(true);
  };

  useEffect(() => {
    fetch("/api/admin/about-config")
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

  const handleSave = async () => {
    setSaving(true);
    await fetch("/api/admin/about-config", {
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
          <h1 className="text-3xl h-display">About Page Settings</h1>
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
        <div className="grid grid-cols-1 gap-6">
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
      </section>

      {/* Founder Section */}
      <section className="bg-zinc-900 p-8 border border-bone/10 space-y-6">
        <h2 className="text-2xl h-display border-b border-bone/10 pb-4">Founder Section</h2>
        <SectionControls 
          title="Founder" 
          configData={config.founder} 
          onChange={(field, val) => updateConfig({ ...config, founder: { ...config.founder, [field]: val } })} 
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-widest text-bone mb-2">Image</label>
              <div className="relative w-48 h-64 bg-black group border border-bone/20 flex flex-col items-center justify-center">
                {config.founder.imageId ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={`/api/images/${config.founder.imageId}`} alt="Founder" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-bone/50 text-xs">Upload Image</span>
                )}
                <input type="file" accept="image/*" onChange={(e) => handleUploadImage("founder.imageId", e)} className="absolute inset-0 opacity-0 cursor-pointer" />
              </div>
            </div>
            
            <div>
              <label className="block text-xs uppercase tracking-widest text-bone mb-2">Eyebrow</label>
              <input type="text" value={config.founder.eyebrow} onChange={e => updateConfig({ ...config, founder: { ...config.founder, eyebrow: e.target.value } })} className="w-full bg-black/50 border border-bone/20 p-2 text-bone outline-none" />
            </div>
            
            <div>
              <label className="block text-xs uppercase tracking-widest text-bone mb-2">Script Title</label>
              <input type="text" value={config.founder.scriptTitle} onChange={e => updateConfig({ ...config, founder: { ...config.founder, scriptTitle: e.target.value } })} className="w-full bg-black/50 border border-bone/20 p-2 text-bone outline-none" />
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-widest text-bone mb-2">Title</label>
              <input type="text" value={config.founder.title} onChange={e => updateConfig({ ...config, founder: { ...config.founder, title: e.target.value } })} className="w-full bg-black/50 border border-bone/20 p-2 text-bone outline-none" />
            </div>
            
            <div>
              <label className="block text-xs uppercase tracking-widest text-bone mb-2">Content Paragraph</label>
              <textarea value={config.founder.content} onChange={e => updateConfig({ ...config, founder: { ...config.founder, content: e.target.value } })} className="w-full bg-black/50 border border-bone/20 p-2 text-bone outline-none h-32" />
            </div>
            
            <div>
              <label className="block text-xs uppercase tracking-widest text-bone mb-2">Bullet Points (one per line)</label>
              <textarea 
                value={config.founder.bullets.join("\n")} 
                onChange={e => updateConfig({ ...config, founder: { ...config.founder, bullets: e.target.value.split("\n") } })} 
                className="w-full bg-black/50 border border-bone/20 p-2 text-bone outline-none h-32" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-zinc-900 p-8 border border-bone/10 space-y-6">
        <h2 className="text-2xl h-display border-b border-bone/10 pb-4">Stats Section</h2>
        <SectionControls 
          title="Stats" 
          configData={config.stats} 
          onChange={(field, val) => updateConfig({ ...config, stats: { ...config.stats, [field]: val } })} 
        />
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {config.stats.items.map((stat: any, i: number) => (
            <div key={i} className="bg-black/30 p-4 border border-bone/10">
              <input 
                type="text" 
                value={stat.n} 
                placeholder="Number"
                onChange={e => {
                  const newStats = [...config.stats.items];
                  newStats[i].n = e.target.value;
                  updateConfig({ ...config, stats: { ...config.stats, items: newStats } });
                }}
                className="w-full bg-transparent border-b border-bone/20 text-bone outline-none text-2xl font-script text-gold mb-2 text-center" 
              />
              <input 
                type="text" 
                value={stat.label} 
                placeholder="Label"
                onChange={e => {
                  const newStats = [...config.stats.items];
                  newStats[i].label = e.target.value;
                  updateConfig({ ...config, stats: { ...config.stats, items: newStats } });
                }}
                className="w-full bg-transparent border-b border-bone/20 text-bone outline-none text-[10px] uppercase text-center" 
              />
            </div>
          ))}
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="bg-zinc-900 p-8 border border-bone/10 space-y-6">
        <h2 className="text-2xl h-display border-b border-bone/10 pb-4">Philosophy Section</h2>
        <SectionControls 
          title="Philosophy" 
          configData={config.philosophy} 
          onChange={(field, val) => updateConfig({ ...config, philosophy: { ...config.philosophy, [field]: val } })} 
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs uppercase tracking-widest text-bone mb-2">Eyebrow</label>
            <input type="text" value={config.philosophy.eyebrow} onChange={e => updateConfig({ ...config, philosophy: { ...config.philosophy, eyebrow: e.target.value } })} className="w-full bg-black/50 border border-bone/20 p-2 text-bone outline-none" />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-bone mb-2">Title</label>
            <input type="text" value={config.philosophy.title} onChange={e => updateConfig({ ...config, philosophy: { ...config.philosophy, title: e.target.value } })} className="w-full bg-black/50 border border-bone/20 p-2 text-bone outline-none" />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-bone mb-2">Mission</label>
            <textarea value={config.philosophy.mission} onChange={e => updateConfig({ ...config, philosophy: { ...config.philosophy, mission: e.target.value } })} className="w-full bg-black/50 border border-bone/20 p-2 text-bone outline-none h-24" />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-bone mb-2">Vision</label>
            <textarea value={config.philosophy.vision} onChange={e => updateConfig({ ...config, philosophy: { ...config.philosophy, vision: e.target.value } })} className="w-full bg-black/50 border border-bone/20 p-2 text-bone outline-none h-24" />
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-xs uppercase tracking-widest text-bone mb-4">Core Values</label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {config.philosophy.values.map((v: any, i: number) => (
              <div key={i} className="bg-black/30 p-4 border border-bone/10 flex flex-col gap-3">
                <input 
                  type="text" 
                  value={v.title} 
                  onChange={e => {
                    const newVals = [...config.philosophy.values];
                    newVals[i].title = e.target.value;
                    updateConfig({ ...config, philosophy: { ...config.philosophy, values: newVals } });
                  }}
                  className="w-full bg-transparent border-b border-bone/20 text-bone outline-none text-xl" 
                />
                <textarea 
                  value={v.detail} 
                  onChange={e => {
                    const newVals = [...config.philosophy.values];
                    newVals[i].detail = e.target.value;
                    updateConfig({ ...config, philosophy: { ...config.philosophy, values: newVals } });
                  }}
                  className="w-full bg-transparent border-b border-bone/20 text-bone/70 outline-none text-sm h-24" 
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials & CTA */}
      <section className="bg-zinc-900 p-8 border border-bone/10 space-y-6">
        <h2 className="text-2xl h-display border-b border-bone/10 pb-4">Other Sections</h2>
        <SectionControls 
          title="Testimonials" 
          configData={config.testimonials} 
          onChange={(field, val) => updateConfig({ ...config, testimonials: { ...config.testimonials, [field]: val } })} 
        />
        <SectionControls 
          title="CTA" 
          configData={config.cta} 
          onChange={(field, val) => updateConfig({ ...config, cta: { ...config.cta, [field]: val } })} 
        />
        
        <div className="bg-black/20 p-4 border border-bone/10">
          <h3 className="text-lg text-bone mb-4">CTA Content</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-widest text-bone mb-2">Title</label>
              <input type="text" value={config.cta.title} onChange={e => updateConfig({ ...config, cta: { ...config.cta, title: e.target.value } })} className="w-full bg-black/50 border border-bone/20 p-2 text-bone outline-none" />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-bone mb-2">Background Image</label>
              <div className="relative h-10 bg-bone/10 border border-bone/20 flex items-center justify-center">
                {config.cta.imageId ? <span className="text-xs">Image Selected</span> : <span className="text-xs opacity-50">Upload Image</span>}
                <input type="file" accept="image/*" onChange={(e) => handleUploadImage("cta.imageId", e)} className="absolute inset-0 opacity-0 cursor-pointer" />
              </div>
            </div>
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
                fetch("/api/admin/about-config").then(r => r.json()).then(d => { setConfig(d); setLoading(false); }); }}
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
