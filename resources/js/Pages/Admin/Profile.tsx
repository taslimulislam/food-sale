import { Head, useForm, usePage } from '@inertiajs/react';
import AdminLayout from './Layout';

export default function Profile({ profile }) {
    const { status } = usePage().props;

    const profileForm = useForm({
        name: profile.name,
        email: profile.email,
    });

    const passwordForm = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const submitProfile = (event) => {
        event.preventDefault();
        profileForm.patch('/admin/profile');
    };

    const submitPassword = (event) => {
        event.preventDefault();
        passwordForm.put('/admin/profile/password', {
            onSuccess: () => passwordForm.reset('current_password', 'password', 'password_confirmation'),
        });
    };

    return (
        <>
            <Head title="Profile" />

            <AdminLayout title="Profile">
                <div className="space-y-6">
                    {status && (
                        <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submitProfile} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                        <h2 className="text-lg font-semibold">Profile</h2>

                        <div className="mt-4 grid gap-4 md:grid-cols-2">
                            <div>
                                <label className="mb-1 block text-sm font-medium text-slate-700">Name</label>
                                <input
                                    type="text"
                                    value={profileForm.data.name}
                                    onChange={(event) => profileForm.setData('name', event.target.value)}
                                    className="w-full rounded-lg border border-slate-300 px-3 py-2"
                                />
                                {profileForm.errors.name && (
                                    <p className="mt-1 text-sm text-rose-600">{profileForm.errors.name}</p>
                                )}
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium text-slate-700">Email</label>
                                <input
                                    type="email"
                                    value={profileForm.data.email}
                                    onChange={(event) => profileForm.setData('email', event.target.value)}
                                    className="w-full rounded-lg border border-slate-300 px-3 py-2"
                                />
                                {profileForm.errors.email && (
                                    <p className="mt-1 text-sm text-rose-600">{profileForm.errors.email}</p>
                                )}
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={profileForm.processing}
                            className="mt-5 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
                        >
                            Save Profile
                        </button>
                    </form>

                    <form onSubmit={submitPassword} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                        <h2 className="text-lg font-semibold">Change Password</h2>

                        <div className="mt-4 grid gap-4 md:grid-cols-2">
                            <div className="md:col-span-2">
                                <label className="mb-1 block text-sm font-medium text-slate-700">Current Password</label>
                                <input
                                    type="password"
                                    value={passwordForm.data.current_password}
                                    onChange={(event) => passwordForm.setData('current_password', event.target.value)}
                                    className="w-full rounded-lg border border-slate-300 px-3 py-2"
                                />
                                {passwordForm.errors.current_password && (
                                    <p className="mt-1 text-sm text-rose-600">{passwordForm.errors.current_password}</p>
                                )}
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium text-slate-700">New Password</label>
                                <input
                                    type="password"
                                    value={passwordForm.data.password}
                                    onChange={(event) => passwordForm.setData('password', event.target.value)}
                                    className="w-full rounded-lg border border-slate-300 px-3 py-2"
                                />
                                {passwordForm.errors.password && (
                                    <p className="mt-1 text-sm text-rose-600">{passwordForm.errors.password}</p>
                                )}
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium text-slate-700">Confirm Password</label>
                                <input
                                    type="password"
                                    value={passwordForm.data.password_confirmation}
                                    onChange={(event) =>
                                        passwordForm.setData('password_confirmation', event.target.value)
                                    }
                                    className="w-full rounded-lg border border-slate-300 px-3 py-2"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={passwordForm.processing}
                            className="mt-5 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
                        >
                            Update Password
                        </button>
                    </form>
                </div>
            </AdminLayout>
        </>
    );
}
