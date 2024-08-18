import { useEffect } from "react";

import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import TextareaInput from "@/Components/TextareaInput";
import TextInput from "@/Components/TextInput";
import { TodoFormProps } from "@/types";

// import { useForm } from '@inertiajs/react';

const TodoForm = ({
    errors,
    processing,
    data,
    onSubmit,
    onChange,
    onCancel,
    isEditing,
    titleInputRef,
    descriptionInputRef,
}: TodoFormProps & {
    titleInputRef: React.RefObject<HTMLInputElement>;
    descriptionInputRef: React.RefObject<HTMLTextAreaElement>;
}) => {
    // 最初のバリデーション時にもフォーカスが設定されるように調整
    useEffect(() => {
        if (errors.title && titleInputRef.current) {
            titleInputRef.current.focus();
        } else if (errors.description && descriptionInputRef.current) {
            descriptionInputRef.current.focus();
        }
    }, [errors, titleInputRef, descriptionInputRef]);

    return (
        <form onSubmit={onSubmit} className="p-6">
            <h2 className="text-lg text-gray-900 font-bold">
                {isEditing ? "Todo 編集" : "Todo 作成"}
            </h2>

            <div className="mt-6">
                <InputLabel htmlFor="title" value="title" className="ml-2" />

                <TextInput
                    id="title"
                    type="text"
                    name="title"
                    ref={titleInputRef}
                    value={data.title}
                    onChange={onChange}
                    className="mt-1 block w-3/4"
                    isFocused
                    placeholder="todoを入力"
                />

                <InputError message={errors.title} className="mt-2" />
            </div>

            <div className="mt-6">
                <InputLabel
                    htmlFor="description"
                    value="description"
                    className="ml-2"
                />

                <TextareaInput
                    id="description"
                    name="description"
                    ref={descriptionInputRef}
                    value={data.description ?? ""}
                    onChange={onChange}
                    className="mt-1 block w-3/4"
                    placeholder="詳細を入力"
                />

                <InputError message={errors.description} className="mt-2" />
            </div>

            {isEditing && (
                <div className="mt-6">
                    <InputLabel
                        htmlFor="is_completed"
                        value="is_completed"
                        className="ml-2"
                    />

                    <Checkbox
                        id="is_completed"
                        name="is_completed"
                        type="checkbox"
                        checked={data.is_completed}
                        onChange={(e) => onChange(e)}
                        className="mt-1 ml-1 block w-5"
                    />

                    <InputError
                        message={errors.is_completed}
                        className="mt-2"
                    />
                </div>
            )}

            <div className="mt-6 flex justify-end">
                <SecondaryButton onClick={onCancel}>Cancel</SecondaryButton>

                <PrimaryButton className="ms-3" disabled={processing}>
                    Save
                </PrimaryButton>
            </div>
        </form>
    );
};

export default TodoForm;
