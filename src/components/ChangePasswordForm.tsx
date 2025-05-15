import { ErrorMessage, Field, Form, Formik } from 'formik';
import type { ChangePasswordFormProps } from '../types/props';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { passwordResetValidationSchema } from '../validation/auth';
import { Button } from '@mui/material';
import type { ChangeEvent } from 'react';

const initialValues = {
    password: '',
    repeatPassword: '',
};

export default function ChangePasswordForm({
    handleSubmit,
    isPasswordMatch,
    handlePassChange,
    passwords,
}: ChangePasswordFormProps) {
    return (
        <div className="overlay">
            <h1>Change password</h1>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={toFormikValidationSchema(
                    passwordResetValidationSchema
                )}
                validateOnChange
            >
                <Form className="flex flex-col gap-10 w-full">
                    <label className=" relative flex flex-col gap-2">
                        <h3 className="pl-[20px]">New password</h3>
                        <Field
                            type="password"
                            name="password"
                            onChange={(evt: ChangeEvent<HTMLInputElement>) =>
                                handlePassChange(evt, 'pass')
                            }
                            value={passwords.password}
                        />
                        <ErrorMessage name="password">
                            {msg => (
                                <div className=" absolute -bottom-2 left-[20px] translate-y-full">
                                    <p className=" text-red-500">{msg}</p>
                                </div>
                            )}
                        </ErrorMessage>
                    </label>
                    <label className=" relative flex flex-col gap-2">
                        <h3 className="pl-[20px]">Repeat password</h3>
                        <Field
                            type="password"
                            name="repeatPassword"
                            onChange={(evt: ChangeEvent<HTMLInputElement>) =>
                                handlePassChange(evt, 'repeat')
                            }
                            value={passwords.repeatPassword}
                        />
                        <ErrorMessage name="repeatPassword">
                            {msg => (
                                <div className=" absolute -bottom-2 left-[20px] translate-y-full">
                                    <p className=" text-red-500">{msg}</p>
                                </div>
                            )}
                        </ErrorMessage>
                    </label>
                    <Button
                        variant="contained"
                        type="submit"
                        disabled={!isPasswordMatch}
                    >
                        Change
                    </Button>
                </Form>
            </Formik>
        </div>
    );
}
