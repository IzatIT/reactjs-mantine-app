import { Card, Center, Flex } from "@mantine/core";
import {RootContainer} from "src/shared/ui/containers";
import {AuthParticles} from "src/shared/ui/particles";
import {AuthFeature} from "src/features";

export function LoginPage() {
    return (
        <RootContainer centered>
            <Flex
                pos="relative"
                direction="column" mx={{ base: 0, xs: 100 }}
                mt={30} justify="start" w="100%" h="100%">
                <Center h="100%"
                    pos="relative" style={{ zIndex: 10 }}
                    w="100%">
                    <Card w={340} radius="lg" style={{ boxShadow: "rgba(255, 255, 255, 0.35) 0px 5px 15px" }}>
                        <AuthFeature />
                    </Card>
                </Center>
                <AuthParticles />
            </Flex>
        </RootContainer>
    )
}