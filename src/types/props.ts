import type { FormikHelpers, FormikValues } from 'formik';
import type {
    authInitialValuesType,
    emailInitialValues,
    passwordInitialValues,
} from './formik';
import type {
    // ChangeEvent,
    Dispatch,
    ReactElement,
    SetStateAction,
} from 'react';
import type { Session, User } from '@supabase/supabase-js';

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
