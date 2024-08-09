import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps, Todo } from "@/types";
import { Head } from "@inertiajs/react";

export default function Dashboard({ auth, todos }: PageProps) {
    /**
     * データ確認用あとで消す！！
     */
    console.log(auth);
    console.log(todos);

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
