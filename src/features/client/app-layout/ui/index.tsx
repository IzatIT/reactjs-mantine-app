import { Box } from "@mantine/core"
import { Header } from "./header"
import { Footer } from "./footer"

type Props = {
    children?: React.ReactNode
}

export const AppLayout = ({ children }: Props) => {
    return (
        <Box >
            <Header />
            <Box  mih="70vh" style={{maxWidth: "100vw", overflowX: "hidden"}}>
                {children}
            </Box>
            <Footer />
        </Box>
    )
}
