import { Head } from '@inertiajs/react';

export default function Home() {
    return (
        <>
            <Head title="Dashboard" />

            <main className="min-h-screen bg-slate-50">
                <div className="mx-auto max-w-5xl px-6 py-20">
                    <h1 className="text-3xl font-semibold text-slate-900">
                        ERP Step A Setup Complete
                    </h1>
                    <p className="mt-4 text-slate-600">
                        Laravel, React, Inertia, Sanctum, and API v1 routing are ready.
                    </p>
                </div>
            </main>
        </>
    );
}
