import { auth } from "@/server/auth"
import { UserButton } from "./user-button"
import { Button } from "../ui/button"
import { Link, LogIn } from "lucide-react"

export default async function Nav(){
    const session = await auth()

    return(
        <header className="bg-slate-500 ">
            <nav>
                <ul className="flex justify-between p-4">
                    <li>Logo</li>
                    {!session?(
                        <li>
                            <Button asChild>
                                <Link aria-label="signin" href="/auth/login">
                                    <LogIn/>
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