import { FormEventHandler } from 'react';
import DangerButton from '@/Components/DangerButton';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import { useForm } from '@inertiajs/react';
import { DeleteConfirmFormProps } from '@/types';

export default function DeleteTeamTodoConfirmForm({
    id,
    onConfirm,
    onCancel,
    className = '',
}: DeleteConfirmFormProps) {

    const {
        processing,
    } = useForm({
    });

    const deleteTeamTodo: FormEventHandler = (e) => {
        e.preventDefault();
        // onConfirm callbackを呼び出して削除処理を親コンポーネントで行う
        onConfirm(id);
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <Modal show={true} onClose={onCancel}>
                <form onSubmit={deleteTeamTodo} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        ID：{id}のTodoを削除してもよろしいですか?
                    </h2>

                    <p className="mt-1 text-sm text-red-600">
                        この操作は元に戻せません
                    </p>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={onCancel}>キャンセル</SecondaryButton>
                        <DangerButton className="ms-3" disabled={processing}>
                            削除
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
