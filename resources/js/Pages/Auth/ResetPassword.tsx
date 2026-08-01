import { Head, Link, useForm } from '@inertiajs/react';

export default function ResetPassword({ token, email }) {
    const form = useForm({
        token,
        email,
        password: '',
        password_confirmation: '',
    });

    const submit = (event) => {
        event.preventDefault();
        form.post('/admin/reset-password');
    };

    return (
        <>
            <Head title="Reset Password" />

            <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
                <form onSubmit={submit} className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h1 className="text-2xl font-semibold text-slate-900">Reset Password</h1>

                    <div className="mt-5 space-y-4">
                        <div>
                            <label className="mb-1 block text-sm font-medium text-slate-700">Email</label>
                            <input
                                type="email"
                                value={form.data.email}
                                onChange={(event) => form.setData('email', event.target.value)}
                                className="w-full rounded-lg border border-slate-300 px-3 py-2"
                            />
                            {form.errors.email && <p className="mt-1 text-sm text-rose-600">{form.errors.email}</p>}
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium text-slate-700">New Password</label>
                            <input
                                type="password"
                                value={form.data.password}
                                onChange={(event) => form.setData('password', event.target.value)}
                                className="w-full rounded-lg border border-slate-300 px-3 py-2"
                            />
                            {form.errors.password && (
                                <p className="mt-1 text-sm text-rose-600">{form.errors.password}</p>
                            )}
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium text-slate-700">Confirm Password</label>
                            <input
                                type="password"
                                value={form.data.password_confirmation}
                                onChange={(event) => form.setData('password_confirmation', event.target.value)}
                                className="w-full rounded-lg border border-slate-300 px-3 py-2"
                            />
                        </div>
                    </div>

                    <div className="mt-6 flex items-center justify-between">
                        <Link href="/admin/login" className="text-sm font-medium text-slate-700 hover:text-slate-900">
                            Back to login
                        </Link>

                        <button
                            type="submit"
                            disabled={form.processing}
                            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
                        >
                            Reset Password
                        </button>
                    </div>
                </form>
            </main>
        </>
    );
}
