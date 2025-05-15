import { Button } from '@mui/material';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { emailInObjValidationSchema } from '../validation/auth';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import type { SendPassResEmailFormProps } from '../types/props';

const initialValues = {
    email: '',
};

export default function SendPassResEmailForm({
    handleSubmit,
}: SendPassResEmailFormProps) {
    return (
        <div className="overlay">
            <h1>Send email to reset password</h1>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={toFormikValidationSchema(
                    emailInObjValidationSchema
                )}
                validateOnChange
            >
                <Form className="flex flex-col gap-10 w-full">
                    <label className=" relative flex flex-col gap-2">
                        <h3 className="pl-[20px]">Email</h3>
                        <Field type="email" name="email" />
                        <ErrorMessage name="email">
                            {msg => (
                                <div className=" absolute -bottom-2 left-[20px] translate-y-full">
                                    <p className=" text-red-500">{msg}</p>
                                </div>
                            )}
                        </ErrorMessage>
                    </label>
                    <Button variant="contained" type="submit">
                        Send
                    </Button>
                </Form>
            </Formik>
        </div>
    );
}
