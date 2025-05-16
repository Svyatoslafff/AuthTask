import type { FormikHelpers, FormikValues } from 'formik';
import type {
    authInitialValuesType,
    emailInitialValues,
    passwordInitialValues,
} from './formik';
import type { Dispatch, FormEvent, ReactElement, SetStateAction } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import type { Columns, ImageData } from './states';
import type { DragEndEvent } from '@dnd-kit/core';

export type AuthComponentProps = {
    handleSubmit: (
        values: FormikValues & authInitialValuesType,
        action: FormikHelpers<FormikValues & authInitialValuesType>
    ) => void;
    type: 'login' | 'register';
};

export type LoginPageProps = {
    setSession: Dispatch<SetStateAction<Session | null>>;
};

export type AppBarProps = {
    session: Session | null;
    setSession: Dispatch<SetStateAction<Session | null>>;
};

export type PrivateRouteProps = {
    session: Session | null;
    redirectTo: string;
    children: ReactElement;
};

export type HomePageProps = {
    session: Session | null;
    setSession: Dispatch<SetStateAction<Session | null>>;
};

export type UserStatisticsProps = {
    user: User;
    session: Session | null;
    handleLogoutClick: () => void;
};

export type SendPassResEmailFormProps = {
    handleSubmit: (values: emailInitialValues) => void;
};

export type ChangePasswordFormProps = {
    handleSubmit: (values: passwordInitialValues) => void;
};

export type PhotosPageProps = {
    session: Session | null;
};

export type PhotoUploadingModalProps = {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    handleSubmit: (evt: FormEvent<HTMLDivElement>) => void;
    photos: File[] | undefined;
    setPhotos: Dispatch<SetStateAction<File[] | undefined>>;
};

export type ImagesListProps = {
    urlsList: ImageData[];
    isLoading: boolean;
};

export type ToDo = {
    id: string;
    userId: string;
    created_at: string;
    name: string;
    description: string;
    status: 'todo' | 'inProgress' | 'done';
    position: number;
};

export type TasksListProps = {
    handleDragEnd: (evt: DragEndEvent) => void;
    columns: Columns;
};

export type SortableItemProps = {
    task: ToDo;
};

type newToDo = { name: string; description: string; status: string };

export type CreateToDoModalProps = {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    handleSubmit: (evt: FormEvent<HTMLDivElement>) => void;
    newToDo: newToDo;
    setNewToDo: Dispatch<SetStateAction<newToDo>>;
};
