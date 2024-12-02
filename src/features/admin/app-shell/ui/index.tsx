"use client"
import { useDisclosure } from "@mantine/hooks";
import { useEffect } from "react";
import { AppShellNavbarFeature } from "./navbar";
import {AppShell, Flex, Paper, ScrollArea, Title} from "@mantine/core";
import styles from "./styles.module.scss"
import { COLORS } from "src/constants";
import {ProfileActionsFeature} from "src/features/admin/app-shell/ui/profile-actions";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {AppBurger} from "src/shared/ui/burger";
import {ChangeLanguage} from "src/shared/ui/change-language";
import {AppButtonGroup} from "src/shared/ui/forms";
import Cookies from "js-cookie";

type Props = {
    children: React.ReactNode;
    pageTitle?: string;
    withButtons?: boolean;
    withCreateButton?: boolean;
    createRouterPath?: string;
    filterToggle?: () => void
    sortingToggle?: () => void
}

const navbarMaxWidth = 280
const navbarMinWidth = 90


export const AdminAppShell = ({
    children,
    pageTitle,
    withButtons = true,
    withCreateButton = true,
    createRouterPath,
    filterToggle,
    sortingToggle
}: Props) => {
    const [opened, { toggle, close, open }] = useDisclosure(true);
    const router = useNavigate()
    const {t} = useTranslation()

    const handleToggle = () => {
        Cookies.set("navbar-open", opened ? "true" : "false")
        toggle()
    }

    useEffect(() => {
        const res = Cookies.get("navbar-open")
        if (res) {
            close()
        } else {
            open()
        }
    }, [])


    const header = (
        <Flex className={styles.header_box}>
            <Flex align="center" gap={32}>
                <AppBurger
                    opened={opened}
                    toggle={handleToggle}
                />
            </Flex>
            <Flex align="center" gap={16}>
                <ChangeLanguage />
                <ProfileActionsFeature/>
            </Flex>
        </Flex>
    )
    const navbar = (
        <AppShellNavbarFeature opened={opened} />
    )

    const top = withButtons && filterToggle ? (
        <AppButtonGroup
            leftLabel={t("button.filter")}
            centerLabel={t("button.sorting")}
            rightLabel={withCreateButton ? t("button.create") : undefined}
            leftVariant="filter"
            centerVariant="sorting"
            leftOnClick={filterToggle}
            centerOnClick={sortingToggle}
            rightOnClick={withCreateButton ? () => createRouterPath && router(createRouterPath) : undefined}
        />
    ) : null
    return (
        <AppShell
            header={{ height: 60 }}
            styles={{ navbar: { overflow: "hidden" } }}
            navbar={{
                width: opened ? navbarMaxWidth : navbarMinWidth,
                breakpoint: 'sm',
                collapsed: { desktop: false, mobile: false },
            }}
            padding="lg"
        >
            <AppShell.Header className={styles.header}>
                {header}
            </AppShell.Header>

            <AppShell.Navbar display={{ base: "none", sm: "block" }} className={styles.navbar}>
                {navbar}
            </AppShell.Navbar>

            <AppShell.Main bg={COLORS.TRIOTERY_COLOR}>
                <Flex
                    direction={{ base: "column", sm: "row" }}
                    mb={15} align="center"
                    justify={{ base: "start", sm: pageTitle ? "space-between" : "end" }}>
                    {pageTitle &&
                        <Title tt="uppercase" fz={26} fw={900} c={COLORS.PRIMARY_COLOR}>
                            {pageTitle}
                        </Title>}
                    {top}
                </Flex>
                <ScrollArea h="80vh" scrollbars="y">
                    <Paper
                        w="100%"
                        p="lg"
                        bg={COLORS.PRIMARY_BG}>
                        {children}
                    </Paper>
                </ScrollArea>
            </AppShell.Main>
            <AppShell.Footer className={styles.footer} display={{ base: "block", sm: "none" }}>
                {navbar}
            </AppShell.Footer>
        </AppShell>
    )
}
