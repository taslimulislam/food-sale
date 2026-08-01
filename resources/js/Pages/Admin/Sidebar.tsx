import { Head } from '@inertiajs/react';
import AdminLayout from './Layout';

const items = [
    'Dashboard',
    'Sidebar Menu View',
    'Profile',
    'Change Password',
    'Logout',
];

export default function Sidebar() {
    return (
        <>
            <Head title="Sidebar Menu View" />

            <AdminLayout title="Sidebar Menu View">
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h2 className="text-xl font-semibold">Sidebar Menu Structure</h2>
                    <ul className="mt-4 space-y-2 text-slate-700">
                        {items.map((item) => (
                            <li key={item} className="rounded-lg bg-slate-50 px-3 py-2">
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </AdminLayout>
        </>
    );
}
