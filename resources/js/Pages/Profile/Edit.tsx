import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import { useEffect, useState } from 'react';

export default function Edit({ auth, mustVerifyEmail, status, message }: PageProps<{ mustVerifyEmail: boolean, status?: string, message?: string}>) {

    console.log(message);
    // フラッシュメッセージの型宣言
    let actionMessage: string = message as string;

    // フラッシュメッセージの出現ステータス
    const [showActionMessage, setShowActionMessage] = useState(!!actionMessage);

    // フラッシュメッセージの表示・非表示
    useEffect(() => {
        if (actionMessage) {
            setShowActionMessage(true);
            const timer = setTimeout(() => {
                setShowActionMessage(false);
            }, 3000); // 3秒後にメッセージを非表示

            return () => clearTimeout(timer); // タイマーをリセット
        }
    }, [actionMessage]);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Profile</h2>}
        >
            <Head title="Profile" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            actionMessage={actionMessage}
                            showActionMessage={showActionMessage}
                            className="max-w-xl"
                        />
                    </div>

                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <UpdatePasswordForm  
                            actionMessage={actionMessage}
                            showActionMessage={showActionMessage} 
                            className="max-w-xl"
                        />
                    </div>

                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
