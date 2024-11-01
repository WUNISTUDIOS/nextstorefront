"use client"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { AuthCard } from "./auth-card"
import {zodResolver} from "@hookform/resolvers/zod"
import {RegisterSchema} from "@/types/register-schema"
import * as z from "zod"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import Link from "next/link"
import { useAction } from "next-safe-action/hooks";
import { cn } from "@/lib/utils"
import { useState } from "react"
import { emailRegister } from "@/server/actions/email-register"
import { FormSuccess } from "./form-success"
import { FormError } from "./form-error"


export default function RegisterForm(){

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver:zodResolver(RegisterSchema),
        defaultValues: {
            email: "",
            password: "",
            name: "",
        }
    })

    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    
    const {execute, status} = useAction(emailRegister,{
        onSuccess(resposne){
            const {data} = resposne || {}
            if(data?.error) setError(data.error)
            if(data?.success) setSuccess(data.success)
        },
    })

    const onSubmit =  (values: z.infer<typeof RegisterSchema>) => {
        execute(values)        
    }

    return(
        <AuthCard 
            cardTitle="make an account" 
            backButtonHref="/auth/login" 
            backButtonLabel="Already have an account?"
            showSocials
            >
                <div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div>
                            <FormField
                                    control={form.control} 
                                    name="name"
                                    render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Username</FormLabel>
                                        <FormControl>
                                        <Input {...field} 
                                            placeholder="cgidev" 
                                            type="type" 
                                        />
                                        </FormControl>
                                        <FormDescription />
                                        <FormMessage />
                                        <FormControl />
                                    </FormItem>
                                    )}
                                />

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
                                <FormSuccess message={success} />
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
                                {"Register"}
                            </Button>
                        </form>
                    </Form> 
                </div>
        </AuthCard>
    )
}