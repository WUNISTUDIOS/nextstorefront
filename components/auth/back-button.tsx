"use client"

import { Link } from "lucide-react"
import { Button } from "@/components/ui/button"

export const BackButton =({
    href,
    label,
}:{
    href: string 
    label: string
}) =>{
    return(
        <Button>
            <Link aria-label={label} href={href}></Link>
        </Button>
    )
}