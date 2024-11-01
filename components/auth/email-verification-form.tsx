"use client"
import { useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { AuthCard } from "./auth-card"
import { FormSuccess } from "./form-success"
import { FormError } from "./form-error"
import { newVerification } from "@/server/actions/tokens"

export const EmailVerificationForm = () => {
    const token = useSearchParams().get("token")
    const router = useRouter()
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    const handleVerificaton = useCallback(()=>{
        if(success || error) return
        if(!token){ setError("Token not found")
            return 
        }
        newVerification(token).then((data)=>{
            if(data.error){setError(data.error)}
            if(data.success){setSuccess(data.success)
                router.push("/auth/login")}
        })
    },[])
    useEffect(()=>{
        handleVerificaton()
    },[])
    return (
        <AuthCard 
            backButtonLabel="back to login" 
            backButtonHref="/auth/login" 
            cardTitle="verify your account"
        >
            <div className="flex items-center flex-col w-full justify-center">
                <p>{!success && !error ? "verifying email.." : null}</p>
                <FormSuccess message={success}/>
                <FormError message={error}/>
            </div>
        </AuthCard>
    )
}