import { useEffect, useState } from 'react';

import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextareaInput from '@/Components/TextareaInput';
import TextInput from '@/Components/TextInput';
import DateInput from '@/Components/DateInput';
import { TodoFormProps } from '@/types';

const TodoForm = ({
    errors,
    processing,
    data,
    setData,
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
    // DateInputの選択基準日
    const Today = new Date();

    // 作成時に作成日・編集時にTodo作成日を設定
    const createdDate = data.created_at ? new Date(data.created_at) : Today;

    // 開始日・期限日のステータス
    const [startDate, setStartDate] = useState<Date | undefined>(data.start_date ? new Date(data.start_date) : undefined);
    const [dueDate, setDueDate] = useState<Date | undefined>(data.due_date ? new Date(data.due_date) : undefined);

    // 最初のバリデーション時にもフォーカスが設定されるように調整
    useEffect(() => {
        if (errors.title && titleInputRef.current) {
            titleInputRef.current.focus();
        } else if (errors.description && descriptionInputRef.current) {
            descriptionInputRef.current.focus();
        }
    }, [errors, titleInputRef, descriptionInputRef]);

    // 開始日の変更処理
    const handleStartDateChange = (date: Date | null) => {
         // stateを更新
        setStartDate(date ?? undefined);
        // stateが変更されるたびにsetDataも更新
        setData('start_date', date ? new Date(date) : undefined);
    };

    // 期限日の変更処理
    const handleDueDateChange = (date: Date | null) => {
        if (date && startDate && date < startDate) {
            alert('期限日は開始日と同じか後に設定してください');
            return;
        }
        setDueDate(date ?? undefined);
        // stateが変更されるたびにsetDataも更新
        setData('due_date', date ? new Date(date) : undefined);
    };


    return (
        <form onSubmit={onSubmit} className="p-6">
            <h2 className="text-lg text-gray-900 font-bold">
                {isEditing ? "Todo 編集" : "Todo 作成"}
            </h2>

            <div className="mt-6">
                <InputLabel htmlFor="title" value="タイトル" className="ml-2" />

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
                    value="詳細"
                    className="ml-2"
                />

                <TextareaInput id="description"
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
                        value="ステータス(完了)"
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

            <div className="mt-6">
                <InputLabel htmlFor="start_date" value="開始日" className="ml-2" />

                <DateInput
                    id="start_date"
                    name="start_date"
                    selected={startDate}
                    onChange={handleStartDateChange}
                    minDate={createdDate}
                    className="mt-1 block w-3/4"
                />

                <InputError message={errors.start_date} className="mt-2" />
            </div>

            <div className="mt-6">
                <InputLabel htmlFor="due_date" value="期限日" className="ml-2" />

                <DateInput
                    id="due_date"
                    name="due_date"
                    selected={dueDate}
                    onChange={handleDueDateChange}
                    minDate={createdDate}
                    className="mt-1 block w-3/4"
                />

                <InputError message={errors.due_date} className="mt-2" />
            </div>

            <div className="mt-6 flex justify-end">
                <SecondaryButton onClick={onCancel}>キャンセル</SecondaryButton>

                <PrimaryButton className="ms-3" disabled={processing}>
                    保存
                </PrimaryButton>
            </div>
        </form>
    );
};

export default TodoForm;
