import { Formik, Form, Field, ErrorMessage } from 'formik';
import type { AuthComponentProps } from '../types/props';
import { authValidationSchema } from '../validation/auth';
import { useEffect } from 'react';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import Button from '@mui/material/Button';

const initialValues = {
    email: '',
    password: '',
};

export default function AuthComponent({
    handleSubmit,
    type,
}: AuthComponentProps) {
    useEffect(() => {}, []);
    return (
        <div className="overlay">
            <h1>{type === 'login' ? 'Login' : 'Register'}</h1>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={toFormikValidationSchema(
                    authValidationSchema
                )}
                validateOnChange
            >
                <Form className="flex flex-col gap-10 w-full">
                    <label className=" relative flex flex-col gap-2">
                        <h3 className="pl-[20px]">Email</h3>
                        <Field type="email" name="email" />
                        <ErrorMessage name="email">
                            {msg => (
                                <div className="absolute -bottom-2 left-[20px] translate-y-full">
                                    <p className=" text-red-500">{msg}</p>
                                </div>
                            )}
                        </ErrorMessage>
                    </label>

                    <label className="relative flex flex-col gap-2">
                        {type === 'login' ? (
                            <div className="flex justify-between">
                                <h3 className="pl-[20px]">Password</h3>
                                <a
                                    className="text-blue-500"
                                    href="/send-reset-password-email"
                                >
                                    Forgot password?
                                </a>
                            </div>
                        ) : (
                            <h3 className="pl-[20px]">Password</h3>
                        )}

                        <Field type="password" name="password" />
                        <ErrorMessage name="password" component="div">
                            {msg => (
                                <div className=" absolute -bottom-2 left-[20px] translate-y-full">
                                    <p className=" text-red-500">{msg}</p>
                                </div>
                            )}
                        </ErrorMessage>
                    </label>

                    <Button variant="contained" type="submit">
                        {type === 'register' ? 'Register' : 'Login'}
                    </Button>
                </Form>
            </Formik>
            <p>
                {type === 'login' ? (
                    <span>
                        If you haven't account yet,{' '}
                        <a className="text-blue-500" href="/register">
                            Register
                        </a>
                    </span>
                ) : (
                    <span>
                        If you already have account,{' '}
                        <a className="text-blue-500" href="/login">
                            Login
                        </a>
                    </span>
                )}
            </p>
        </div>
    );
}
