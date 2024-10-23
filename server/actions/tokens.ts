"use server"
import {db} from "../db"
import { emailTokens } from "../schema"
import { eq } from "drizzle-orm"

export const getVerificationTokenByEmail = async (email: string) => {
    try{
        const verificationToken = await db.query.emailTokens.findFirst({
            where: eq(emailTokens, email)
        })
        return verificationToken
    }catch(e){
        return null
    }
}

export const generateEmailVerificationToken = async (email: string) => {
    const token = crypto.randomUUID()
    const expires = new Date(new Date().getTime() + 3600 * 1000)
    const existingToken = await getVerificationTokenByEmail(email)

    if(existingToken){
        await db.delete(emailTokens).where(eq(emailTokens.id, existingToken.id))
    }
    const verificationToken = await db.insert(emailTokens).values({email, token, expires,}).returning()
    return verificationToken
}
