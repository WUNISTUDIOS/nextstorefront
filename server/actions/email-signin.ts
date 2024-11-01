"use server"
import { createSafeActionClient } from "next-safe-action"
import { loginSchema } from "@/types/login-schema"
import { actionClient } from "@/lib/safe-actions"
import { db } from "../db"
import {eq} from "drizzle-orm"
import {users} from "../schema"
import { generateEmailVerificationToken } from "./tokens"
import { sendVerificationEmail } from "./email"
import { signIn } from "next-auth/react"
import { AuthError } from "next-auth"

const action = createSafeActionClient()

// export const emailSignIn = actionClient(loginSchema, async ({email, password, code}) => {
//     console.log(email, password, code)
//     return {emai}
// })

export const emailSignIn = actionClient.schema
    (loginSchema).action(async ({parsedInput: {email, password, code}}) => {
        try{
            const existingUser = await db.query.users.findFirst({
                where:eq(users.email, email)
            })
            if(existingUser?.email !== email){
                return {error: "User not found"}
            }
            if(!existingUser.emailVerified){
                const verificatonToken = await generateEmailVerificationToken(existingUser.email)
                await sendVerificationEmail(verificatonToken[0].email, verificatonToken[0].token)
                return{success: "Confirmation Email Sent"}
            }
            await signIn('credentials',{
                email,
                password,
                redirectTo: "/",
            })
            return {success: "User Signed In"}
        }catch(error){
            console.log(error)
            if(error instanceof AuthError){
                switch(error.type){
                    case "CredentialsSignin": 
                        return {error: "Email or password is incocorrect"}
                    case "AccessDenied":
                        return {error: error.message}
                    case "OAuthSignInError":
                        return {error: error.message}
                    default:
                        return {error: "An error occurred"}
                }
            }
            throw error
        }
    })