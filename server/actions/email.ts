"use server "

import { EmailTemplate } from "@/components/email-template"
import getBaseURL from "@/lib/base-url"
import {Resend} from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const domain = getBaseURL()
export const sendVerificationEmail = async (email: string, token: string) => {
    const confirmLink = `${domain}/auth/new-verification?token=${token}`
    const { data, error } = await resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: email,
        subject: 'sproud and scribble - confirmation Email',
        react: EmailTemplate({ firstName: 'John' }),
        html: `<a href="${confirmLink}">Confirm your email</a>`,
    })

    if (error) {
        return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
}