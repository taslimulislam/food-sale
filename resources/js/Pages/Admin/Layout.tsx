import { Link, router, usePage } from '@inertiajs/react';

const menuItems = [
    { label: 'Dashboard', href: '/admin/dashboard' },
    { label: 'Sidebar Menu View', href: '/admin/sidebar' },
    { label: 'Profile', href: '/admin/profile' },
];

export default function AdminLayout({ title, children }) {
    const { auth } = usePage().props;
    const currentUrl = usePage().url;

    const logout = () => {
        router.post('/admin/logout');
    };

    return (
        <main className="min-h-screen bg-slate-100 text-slate-900">
            <div className="mx-auto flex min-h-screen max-w-6xl flex-col md:flex-row">
                <aside className="w-full border-b border-slate-200 bg-white p-6 md:w-72 md:border-r md:border-b-0">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Admin Area</p>
                    <h1 className="mt-2 text-2xl font-semibold">{title}</h1>

                    <nav className="mt-8 space-y-2">
                        {menuItems.map((item) => {
                            const isActive = currentUrl.startsWith(item.href);

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`block rounded-lg px-3 py-2 text-sm font-medium transition ${
                                        isActive
                                            ? 'bg-slate-900 text-white'
                                            : 'text-slate-700 hover:bg-slate-100'
                                    }`}
                                >
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="mt-10 border-t border-slate-200 pt-4 text-sm text-slate-600">
                        <p className="font-medium">Signed in as</p>
                        <p>{auth?.user?.name ?? 'Admin'}</p>
                        <p className="text-xs text-slate-500">{auth?.user?.email}</p>
                        <button
                            type="button"
                            onClick={logout}
                            className="mt-4 rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                        >
                            Logout
                        </button>
                    </div>
                </aside>

                <section className="flex-1 p-6 md:p-10">{children}</section>
            </div>
        </main>
    );
}
