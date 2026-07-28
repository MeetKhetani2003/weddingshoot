import Link from 'next/link';
import LogoutButton from '@/components/LogoutButton';

export const metadata = {
  title: "Admin Panel | The Eternal Bliss",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-zinc-950 text-bone pt-24">
      <aside className="w-64 bg-black border-r border-bone/10 p-6 flex flex-col gap-6">
        <h2 className="text-xl font-script text-bone">Admin Panel</h2>
        <nav className="flex flex-col gap-4 mt-8">
          <Link href="/admin/home" className="hover:text-bone/70 transition-colors">Homepage Settings</Link>
          <Link href="/admin/featured" className="hover:text-bone/70 transition-colors">Featured Gallery</Link>
          <Link href="/admin/categories" className="hover:text-bone/70 transition-colors">Categories</Link>
          <Link href="/admin/portfolio" className="hover:text-bone/70 transition-colors">Portfolio Images</Link>
          
          <div className="mt-12 pt-12 border-t border-bone/10">
            <Link href="/" className="text-sm text-bone/50 hover:text-bone block">Back to Site</Link>
            <LogoutButton />
          </div>
        </nav>
      </aside>
      <main className="flex-1 p-10 overflow-y-auto bg-black/20">
        {children}
      </main>
    </div>
  );
}
