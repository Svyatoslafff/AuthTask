import { z } from 'zod';

const emailRegEx =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

export const emailValidationSchema = z
    .string()
    .email()
    .regex(emailRegEx, 'Invalid email')
    .refine(value => !value.startsWith(' '), {
        message: "Email can't start with spaces",
    });

export const passwordValidationSchema = z
    .string()
    .min(6, 'Password must have at least 6 letters')
    .refine(value => !value.startsWith(' '), {
        message: "Password can't start with spaces",
    });

export const emailInObjValidationSchema = z.object({
    email: emailValidationSchema,
});

export const passwordResetValidationSchema = z.object({
    password: passwordValidationSchema,
    repeatPassword: passwordValidationSchema,
});

// export const passwordResetValidationSchema = z.object({
//     password: passwordValidationSchema,
//     repeatPassword: z
//         .string()
//         .min(6, 'Password must have at least 6 letters')
//         .refine((value, { password }) => value === password, {
//             message: 'Passwords must match',
//         }),
// });

export const authValidationSchema = z.object({
    email: emailValidationSchema,
    password: passwordValidationSchema,
});
