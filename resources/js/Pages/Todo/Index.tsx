import { FormEventHandler, useRef, useState } from 'react';

import Checkbox from '@/Components/Checkbox';
import DangerButton from '@/Components/DangerButton';
import EditButton from '@/Components/EditButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextareaInput from '@/Components/TextareaInput';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps, Todo } from '@/types';
import { Head, useForm } from '@inertiajs/react';

export default function Dashboard({ auth, todos }: PageProps) {
    const [todoCreate, setTodoCreate] = useState(false);
    const titleInput = useRef<HTMLInputElement>(null);
    const descriptionInput = useRef<HTMLInputElement>(null);

    const { data, setData, post, processing, reset, errors } = useForm({
        title: "",
        description: "",
    });

    const confirmTodoCreate = () => {
        setTodoCreate(true);
    };

    const todoStore: FormEventHandler = (e) => {
        e.preventDefault();

        /**
         * バリデーションエラー確認用 あとで消す
         */
        console.log(errors);

        post(route("todo.store"), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => titleInput.current?.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setTodoCreate(false);

        reset();
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Todo
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <PrimaryButton
                        onClick={confirmTodoCreate}
                        className="mb-5 mx-5"
                    >
                        Add
                    </PrimaryButton>

                    <Modal show={todoCreate} onClose={closeModal}>
                        <form onSubmit={todoStore} className="p-6">
                            <h2 className="text-lg text-gray-900 font-bold">
                                Todo 作成
                            </h2>

                            <div className="mt-6">
                                <InputLabel
                                    htmlFor="title"
                                    value="title"
                                    className="sr-only"
                                />

                                <TextInput
                                    id="title"
                                    type="text"
                                    name="title"
                                    ref={titleInput}
                                    value={data.title}
                                    onChange={(e) =>
                                        setData("title", e.target.value)
                                    }
                                    className="mt-1 block w-3/4"
                                    isFocused
                                    placeholder="title"
                                />

                                <InputError
                                    message={errors.title}
                                    className="mt-2"
                                />
                            </div>
                            <div className="mt-6">
                                <InputLabel
                                    htmlFor="description"
                                    value="description"
                                    className="sr-only"
                                />

                                <TextareaInput
                                    id="description"
                                    name="description"
                                    ref={descriptionInput}
                                    value={data.description}
                                    onChange={(e) =>
                                        setData("description", e.target.value)
                                    }
                                    className="mt-1 block w-3/4"
                                    isFocused
                                    placeholder="description"
                                />

                                <InputError
                                    message={errors.description}
                                    className="mt-2"
                                />
                            </div>

                            <div className="mt-6 flex justify-end">
                                <SecondaryButton onClick={closeModal}>
                                    Cancel
                                </SecondaryButton>

                                <PrimaryButton
                                    className="ms-3"
                                    disabled={processing}
                                >
                                    Save
                                </PrimaryButton>
                            </div>
                        </form>
                    </Modal>
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <table>
                                <thead>
                                    <tr>
                                        <th>todo</th>
                                        <th>created_at</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {todos.map((todo: Todo) => (
                                        <tr key={todo.id}>
                                            <td>{todo.title}</td>
                                            <td>
                                                {new Date(
                                                    todo.created_at
                                                ).toLocaleDateString("ja-JP", {
                                                    year: "numeric",
                                                    month: "2-digit",
                                                    day: "2-digit",
                                                })}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
