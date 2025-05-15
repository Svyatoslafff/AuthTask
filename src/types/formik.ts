type password = {
    password: string;
};

export type emailInitialValues = {
    email: string;
};

export type authInitialValuesType = emailInitialValues & password;

export type passwordInitialValues = password & {
    repeatPassword: string;
};
