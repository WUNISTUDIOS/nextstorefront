"use client"

import { useForm } from "react-hook-form"
import { Form } from "../ui/form"
import { AuthCard } from "./auth-card"
import {zodResolver} from "@hookform/resolvers/zod"
import { loginSchema } from "@/types/login-schema"

export default function LoginForm(){

    const form = useForm({
        resolver:zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    })

    const onSubmit =  () => {
        
    }

    return(
        <AuthCard 
            cardTitle="welcome!" 
            backButtonHref="/auth/register" 
            backButtonLabel="create a new account"
            showSocials
            >
                <div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(OnSubmit)}>

                        </form>
                    </Form> 
                </div>

        </AuthCard>
    )
}