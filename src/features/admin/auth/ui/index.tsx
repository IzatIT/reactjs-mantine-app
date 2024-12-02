"use client"
import { login, LoginRequest } from "src/entities/auth"
import { Box, Center, Flex, Title } from "@mantine/core"
import { useForm } from "@mantine/form"
import { IconId } from "@tabler/icons-react"
import { useState } from "react"
import { getLoginForm } from "../helpers"
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {AppButton, AppInput} from "src/shared/ui/forms";

export const AuthFeature = () => {
    const {t, i18n} = useTranslation();
    const router = useNavigate();
    const locale = i18n.language
    const [loading, setLoading] = useState(false)
    const form = useForm<LoginRequest>(getLoginForm({
        minTitle: t("form.errors.minTitle"),
        requiredTitle: t("form.errors.requiredTitle"),
    }))

    const handleSubmit = async () => {
        if (!form.validate().hasErrors) {
            setLoading(true)
            const res = await login(form.values)
            if(res?.authenticationToken){
                router(`/${locale}/admin/appeals`)
            }
            setLoading(false)
        }
    }

    return (
        <Center px={16} py={32} mx="auto">
            <Box h="70%">
                <Title fz={{ base: 18, sm: 24 }} ta="center">
                    {t("page.titles.auth")}
                </Title>
                <Flex align="end" w={280} direction="column" gap={24} mt={50}>
                    <Box w="100%">
                        <AppInput
                            disabled={loading}
                            rightSection={<IconId stroke={1.2} color="black" />}
                            variant="primary"
                            label={t("form.label.inn")}
                            {...form.getInputProps("login")}
                        />
                    </Box>
                    <Box w="100%">
                        <AppInput
                            disabled={loading}
                            minLength={5}
                            variant="primary"
                            type="password"
                            label={t("form.label.password")}
                            {...form.getInputProps("password")}
                        />
                    </Box>
                    <AppButton
                        disabled={loading}
                        onClick={handleSubmit} type="submit"
                        loading={loading}
                        variant="primary">
                        {t("button.login")}
                    </AppButton>
                </Flex>
            </Box>
        </Center>
    )
}
