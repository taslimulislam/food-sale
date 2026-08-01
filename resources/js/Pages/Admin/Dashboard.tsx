import { Head } from '@inertiajs/react';
import AdminLayout from './Layout';

export default function Dashboard() {
    return (
        <>
            <Head title="Admin Dashboard" />

            <AdminLayout title="Dashboard">
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h2 className="text-xl font-semibold">Welcome to the Admin Dashboard</h2>
                    <p className="mt-3 text-slate-600">
                        Step C admin authentication is active. Use the sidebar to manage profile and password settings.
                    </p>
                </div>
            </AdminLayout>
        </>
    );
}
