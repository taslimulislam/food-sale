import { Head, Link, useForm, usePage } from '@inertiajs/react';

export default function ForgotPassword() {
    const { status } = usePage().props;

    const form = useForm({
        email: '',
    });

    const submit = (event) => {
        event.preventDefault();
        form.post('/admin/forgot-password');
    };

    return (
        <>
            <Head title="Forgot Password" />

            <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
                <form onSubmit={submit} className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h1 className="text-2xl font-semibold text-slate-900">Forgot Password</h1>
                    <p className="mt-2 text-sm text-slate-600">
                        Enter your email to receive a password reset link.
                    </p>

                    {status && (
                        <p className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
                            {status}
                        </p>
                    )}

                    <div className="mt-5">
                        <label className="mb-1 block text-sm font-medium text-slate-700">Email</label>
                        <input
                            type="email"
                            value={form.data.email}
                            onChange={(event) => form.setData('email', event.target.value)}
                            className="w-full rounded-lg border border-slate-300 px-3 py-2"
                        />
                        {form.errors.email && <p className="mt-1 text-sm text-rose-600">{form.errors.email}</p>}
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
                            Send Link
                        </button>
                    </div>
                </form>
            </main>
        </>
    );
}
