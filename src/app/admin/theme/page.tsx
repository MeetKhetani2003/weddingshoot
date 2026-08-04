"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ThemeSettingsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [theme, setTheme] = useState({
    colors: {
      ink: "#000000",
      bone: "#edddd3",
      gold: "#c5a880",
      background: "#edddd3",
    },
    typography: {
      heroTitleSize: 4,
      heroSubtitleSize: 3.75,
      exploreTitleSize: 1.5,
      sectionHeadingSize: 2.25,
    },
  });

  useEffect(() => {
    fetch("/api/theme")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.colors) {
          setTheme(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load theme config", err);
        setLoading(false);
      });
  }, []);

  const handleColorChange = (key: string, value: string) => {
    setTheme((prev) => ({
      ...prev,
      colors: {
        ...prev.colors,
        [key]: value,
      },
    }));
  };

  const handleTypographyChange = (key: string, value: number) => {
    setTheme((prev) => ({
      ...prev,
      typography: {
        ...prev.typography,
        [key]: value,
      },
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/theme", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(theme),
      });

      if (res.ok) {
        alert("Theme settings saved successfully!");
        router.refresh();
      } else {
        alert("Failed to save theme settings.");
      }
    } catch (error) {
      console.error(error);
      alert("Error saving settings.");
    }
    setSaving(false);
  };

  if (loading) {
    return <div className="p-8 text-bone">Loading...</div>;
  }

  return (
    <div className="max-w-4xl">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-script text-gold">Theme Settings</h1>
          <p className="mt-2 text-sm text-bone/60">
            Manage site colors and section text sizes. Changes apply globally.
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-gold px-6 py-2 text-sm uppercase tracking-widest text-black hover:bg-gold-deep disabled:opacity-50 transition-colors"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      <div className="grid gap-12 md:grid-cols-2">
        {/* Colors Section */}
        <section className="rounded-xl border border-bone/10 bg-black/40 p-6">
          <h2 className="mb-6 border-b border-bone/10 pb-4 text-xl text-bone">
            Brand Colors
          </h2>
          <div className="space-y-6">
            <div>
              <label className="mb-2 block text-sm text-bone/80">
                Primary Text (Ink)
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="color"
                  value={theme.colors.ink}
                  onChange={(e) => handleColorChange("ink", e.target.value)}
                  className="h-10 w-10 cursor-pointer rounded bg-transparent"
                />
                <input
                  type="text"
                  value={theme.colors.ink}
                  onChange={(e) => handleColorChange("ink", e.target.value)}
                  className="flex-1 border-b border-bone/20 bg-transparent py-2 text-bone focus:border-gold focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm text-bone/80">
                Secondary/Light Background (Bone)
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="color"
                  value={theme.colors.bone}
                  onChange={(e) => handleColorChange("bone", e.target.value)}
                  className="h-10 w-10 cursor-pointer rounded bg-transparent"
                />
                <input
                  type="text"
                  value={theme.colors.bone}
                  onChange={(e) => handleColorChange("bone", e.target.value)}
                  className="flex-1 border-b border-bone/20 bg-transparent py-2 text-bone focus:border-gold focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm text-bone/80">
                Accent Color (Gold)
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="color"
                  value={theme.colors.gold}
                  onChange={(e) => handleColorChange("gold", e.target.value)}
                  className="h-10 w-10 cursor-pointer rounded bg-transparent"
                />
                <input
                  type="text"
                  value={theme.colors.gold}
                  onChange={(e) => handleColorChange("gold", e.target.value)}
                  className="flex-1 border-b border-bone/20 bg-transparent py-2 text-bone focus:border-gold focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm text-bone/80">
                Global Background Color
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="color"
                  value={theme.colors.background}
                  onChange={(e) => handleColorChange("background", e.target.value)}
                  className="h-10 w-10 cursor-pointer rounded bg-transparent"
                />
                <input
                  type="text"
                  value={theme.colors.background}
                  onChange={(e) => handleColorChange("background", e.target.value)}
                  className="flex-1 border-b border-bone/20 bg-transparent py-2 text-bone focus:border-gold focus:outline-none"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Typography Section */}
        <section className="rounded-xl border border-bone/10 bg-black/40 p-6">
          <h2 className="mb-6 border-b border-bone/10 pb-4 text-xl text-bone">
            Section Text Sizes
          </h2>
          <p className="mb-6 text-xs text-bone/50">
            Values are in rem (1rem ≈ 16px).
          </p>
          <div className="space-y-6">
            <div>
              <label className="mb-2 block text-sm text-bone/80">
                Hero Title Size
              </label>
              <input
                type="number"
                step="0.1"
                value={theme.typography.heroTitleSize}
                onChange={(e) =>
                  handleTypographyChange("heroTitleSize", parseFloat(e.target.value) || 4)
                }
                className="w-full rounded border border-bone/20 bg-black px-4 py-2 text-bone focus:border-gold focus:outline-none"
              />
            </div>
            
            <div>
              <label className="mb-2 block text-sm text-bone/80">
                Hero Subtitle Size
              </label>
              <input
                type="number"
                step="0.1"
                value={theme.typography.heroSubtitleSize}
                onChange={(e) =>
                  handleTypographyChange("heroSubtitleSize", parseFloat(e.target.value) || 3.75)
                }
                className="w-full rounded border border-bone/20 bg-black px-4 py-2 text-bone focus:border-gold focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-bone/80">
                Explore Title Size
              </label>
              <input
                type="number"
                step="0.1"
                value={theme.typography.exploreTitleSize}
                onChange={(e) =>
                  handleTypographyChange("exploreTitleSize", parseFloat(e.target.value) || 1.5)
                }
                className="w-full rounded border border-bone/20 bg-black px-4 py-2 text-bone focus:border-gold focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-bone/80">
                General Section Heading Size
              </label>
              <input
                type="number"
                step="0.1"
                value={theme.typography.sectionHeadingSize}
                onChange={(e) =>
                  handleTypographyChange("sectionHeadingSize", parseFloat(e.target.value) || 2.25)
                }
                className="w-full rounded border border-bone/20 bg-black px-4 py-2 text-bone focus:border-gold focus:outline-none"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
