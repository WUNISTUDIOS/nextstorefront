"use server"
import { RegisterSchema } from "@/types/register-schema"
import { createSafeActionClient } from "next-safe-action"
import bcrypt from "bcrypt"
import { db } from "../db"
import { eq } from "drizzle-orm"
import { users } from "../schema"
import { generateEmailVerificationToken } from "./tokens"
import { sendVerificationEmail } from "./email"

const action = createSafeActionClient()

// export const emailRegister = action(
//     RegisterSchema,
//     async ({email, password, name}) => {
//         const hashedPassword = await bcrypt.hash(password, 10)
//         console.log(email, hashedPassword, name)

//         const existingUser = await db.query.users.findFirst({
//             where: eq(users.email, email)
//         })
//     }
// )

export const emailRegister = action.schema(RegisterSchema)
// hasing passwords
    .action(async ({parsedInput: {email, password, name}}) => {
    const hashedPassword = await bcrypt.hash(password, 10)
// check for existing user
    const existingUser = await db.query.users.findFirst({
        where: eq(users.email, email)
    })
    // check if email is already in databaseee - if not, then register - send verification
    if(existingUser){

        if(!existingUser.emailVerified){
            const verificationToken = await generateEmailVerificationToken(email)
            await sendVerificationEmail(verificationToken[0].email, verificationToken[0].token)

            return {success: "Email Confirmation Resent"}
        }
        return {error: "Email already exists"}
    }
    // when user is not found, create a new user
    await db.insert(users).values({email, name,})
    const verificationToken = await generateEmailVerificationToken(email)
    await sendVerificationEmail(verificationToken[0].email, verificationToken[0].token)
    return {success: "confirmation email sent"}
})
    