import { FormEventHandler } from 'react';

import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm, router } from '@inertiajs/react';
import Checkbox from '@/Components/Checkbox';
import { PageProps, UserFormData } from '@/types';
import SecondaryButton from '@/Components/SecondaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function UserRegister({ auth, message }: PageProps) {
    const { data, setData, post, processing, errors, reset } = useForm<UserFormData>({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        is_admin: false
    });

     // ユーザー登録フォームをキャンセルし、ユーザー一覧に遷移
    const cancelUserForm = () => {
        router.get(route('user.index'));
    }

    // ユーザー登録処理
    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        // post(route("user.store"), {
        //     onFinish: () => reset("password", "password_confirmation"),
        // });
        post(route("user.store"), {
            preserveScroll: true,
            onSuccess: () => {
                // 成功時にリセット
                reset();
            },
            onError: () => {
                // if (errors.name && nameInput.current) {
                //     // titleにエラーがある場合、titleInputにフォーカスを移す
                //     titleInput.current.focus();
                // } else if (errors.description && descriptionInput.current) {
                //     // descriptionにエラーがある場合、descriptionInputにフォーカスを移す
                //     descriptionInput.current.focus();
                // }
            },
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
        >
        <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                    <h1 className="font-semibold text-xl text-gray-800 leading-tight py-8">ユーザー登録</h1>
                    <Head title="Register" />
                    
                    <form onSubmit={submit}>
                        <div className="mb-4">
                            <InputLabel htmlFor="name" value="名前" />

                            <TextInput
                                id="name"
                                name="name"
                                value={data.name}
                                className="mt-1 block w-full"
                                autoComplete="name"
                                isFocused={true}
                                onChange={(e) => setData("name", e.target.value)}
                                required
                            />

                            <InputError message={errors.name} className="mt-2" />
                        </div>

                        <div className="mb-4">
                            <InputLabel htmlFor="email" value="メールアドレス" />

                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full"
                                autoComplete="username"
                                onChange={(e) => setData("email", e.target.value)}
                                required
                            />

                            <InputError message={errors.email} className="mt-2" />
                        </div>

                        <div className="mb-4">
                            <InputLabel htmlFor="password" value="パスワード" />

                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full"
                                autoComplete="new-password"
                                onChange={(e) => setData("password", e.target.value)}
                                required
                            />

                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        <div className="mb-4">
                            <InputLabel htmlFor="password_confirmation" value="パスワード(確認用)" />

                            <TextInput
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                className="mt-1 block w-full"
                                autoComplete="new-password"
                                onChange={(e) => setData("password_confirmation", e.target.value)}
                                required
                            />

                            <InputError message={errors.password_confirmation} className="mt-2" />
                        </div>

                        <div className="mb-4">
                            <InputLabel htmlFor="is_admin" value="管理者フラグ" className="ml-2" />

                            <Checkbox
                                id="is_admin"
                                name="is_admin"
                                type="checkbox"
                                checked={data.is_admin}
                                onChange={(e) => setData("is_admin", e.target.checked)}
                                className="mt-1 ml-1 block w-5"
                            />

                            <InputError message={errors.is_admin} className="mt-2" />
                        </div>

                        <div className="flex items-center justify-center mt-4">
                            <SecondaryButton onClick={cancelUserForm}>キャンセル</SecondaryButton>
                            <PrimaryButton className="ms-4" disabled={processing}>
                                登録
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </AuthenticatedLayout>
    );
}
