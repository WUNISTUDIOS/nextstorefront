import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Socials from "./socials"

type CardWrapperProps = {
    children: React.ReactNode
    cardTitle: string
    backButtonHref: string
    backButtonLabel: string
    showSocials?: boolean
}

export const AuthCard = ({
    children,
    cardTitle,
    backButtonHref,
    backButtonLabel,
    showSocials,
}: CardWrapperProps) =>{
    <Card>
        <CardHeader>
            <CardTitle>{cardTitle}</CardTitle>
        </CardHeader>
        <CardContent>{children}</CardContent>

        {showSocials && (
            <CardFooter>
                <Socials />
            </CardFooter>
        )}

        <CardFooter>
            <BackButton />
        </CardFooter>
    </Card>
}