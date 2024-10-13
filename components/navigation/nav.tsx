import { auth } from "@/server/auth"
import { UserButton } from "./user-button"
import { Button } from "../ui/button"
import { LogIn } from "lucide-react"
import Link from "next/link"
import Logo from "./logo"

export default async function Nav(){
    const session = await auth()

    return(
        <header className="py-8">
            <nav>
                <ul className="flex justify-between p-4">
                    <li>
                        <Link href="/">
                            <Logo />
                        </Link>
                    </li>
                    {!session?(
                        <li>
                            <Button asChild>
                                <Link className="flex gap-2" href="/auth/login">
                                    <LogIn size={16}/>
                                    <span>login</span>
                                </Link>
                                </Button>
                        </li>
                    ):    <li>
                    <UserButton expires="sessions?.expires" user={session?.user}/>
                </li>
                }
                </ul>
            </nav>
        </header>
    )
}