"use client"

import { useForm } from "react-hook-form"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { AuthCard } from "./auth-card"
import {zodResolver} from "@hookform/resolvers/zod"
import { loginSchema } from "@/types/login-schema"
import * as z from "zod"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import Link from "next/link"
import { emailSignIn } from "@/server/actions/email-signin"
import { useAction } from "next-safe-action/hooks";
import { cn } from "@/lib/utils"
import { useState } from "react"
import { FormSuccess } from "./form-success"
import { FormError } from "./form-error"

export default function LoginForm(){

    const form = useForm({
        resolver:zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    })

    const [error, setError] = useState<string>("")
    const [success, setSuccess] = useState<string>("")
    const {execute, status} = useAction(emailSignIn,{
        onSuccess(data){
            if(data?.error) setError(data.error)
            if(data?.success){setSuccess(data.success)}
        }
    })

    const onSubmit =  (values: z.infer<typeof loginSchema>) => {
        console.log(values)
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
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div>
                                <FormField
                                    control={form.control} 
                                    name="email"
                                    render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                        <Input {...field} 
                                            placeholder="your email@email.com" 
                                            type="email" 
                                            autoComplete="email"/>
                                        </FormControl>
                                        <FormDescription />
                                        <FormMessage />
                                        <FormControl />
                                    </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control} 
                                    name="password"
                                    render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                        <Input {...field} 
                                            placeholder="**********" 
                                            type="password" 
                                            autoComplete="current-password"/>
                                        </FormControl>
                                        <FormDescription />
                                        <FormMessage />
                                        <FormControl />
                                    </FormItem>
                                    )}
                                />
                                <FormSuccess message={success}/>
                                <FormError message={error}/>
                                <Button size={"sm"} variant={"link"} asChild>
                                    <Link href={"/auth/reset"}>Forgot your password?</Link>
                                </Button>
                            </div>
                            <Button 
                                type="submit" 
                                className={cn("w-full", 
                                status === "executing" ? "animated-pulse" : ""
                            )}>
                                {"Login"}
                            </Button>
                        </form>
                    </Form> 
                </div>
        </AuthCard>
    )
}