"use server "

import getBaseURL from "@/lib/base-url"
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const domain = getBaseURL()
export const sendVerificationEmail = async (email: string, token: string) => {
    const confirmLink = `${domain}/auth/new-verification?token=${token}`
    const { data, error } = await resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: email,
        subject: 'sproud and scribble - confirmation Email',
        html: `<a href="${confirmLink}">Confirm your email</a>`,
    })
    if (error) return console.log(error)
    if(data) return data
}
export const sendPasswordResetEmail = async (email: string, token: string) => {
    const confirmLink = `${domain}/auth/new-password?token=${token}`
    const { data, error } = await resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: email,
        subject: 'sproud and scribble - password reset',
        html: `<p>Click here<a href="${confirmLink}">Reset your password</a></p>`,
    })
    if (error) return console.log(error)
    if(data) return data
}