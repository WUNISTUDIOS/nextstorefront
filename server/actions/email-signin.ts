"use server"
import { createSafeActionClient } from "next-safe-action"
import { loginSchema } from "@/types/login-schema"
import { actionClient } from "@/lib/safe-actions"
import { db } from "../db"
import {eq} from "drizzle-orm"
import {users} from "../schema"

const action = createSafeActionClient()

// export const emailSignIn = actionClient(loginSchema, async ({email, password, code}) => {
//     console.log(email, password, code)
//     return {emai}
// })

export const emailSignIn = actionClient.schema
    (loginSchema).action(async ({parsedInput: {email, password, code}}) => {
        const existingUser = await db.query.users.findFirst({
            where:eq(users.email, email)
        })
        
        if(existingUser?.email !== email){
            return {error: "User not found"}
        }

        // if(!existingUser.emailVerified){
        //     return {error: "Email not verified"}
        // }

        console.log(email, password, code)
        return {success: true}
    })