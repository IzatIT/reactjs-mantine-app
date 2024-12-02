"use client"
import { COLORS } from "src/constants";
import { BackgroundImage, Box, Center, Flex, Text, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import uniqid from "uniqid";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";
import {AppButton} from "src/shared/ui/forms";
import {Content} from "src/shared/helpers/content";
import {AppModal} from "src/shared/ui/modal";
import {AppIframe} from "src/shared/ui/iframe";

export type PageBannerCardProps = {
    titleKg?: string;
    titleRu?: string;
    titleEn?: string;
    contentKg?: string;
    contentRu?: string;
    contentEn?: string;
    imageUrl?: string;
    fileUrl?: string[];
    links?: {
        link?: string;
        order?: number;
        titleKg?: string;
        titleRu?: string;
        titleEn?: string;
    }[];
}

export const PageBannerCard = (data: PageBannerCardProps) => {
    const {t, i18n} = useTranslation()
    const locale = i18n.language
    const [openedDocument, setOpenedDocument] = useState<string>()
    const [openedViewDoc, { toggle }] = useDisclosure()
    const handleViewDocument = (doc?: string) => () => {
        setOpenedDocument(doc)
        toggle()
    }
    const linkButtons = data?.links?.map(link => {
        const isExternalLink = link?.link?.startsWith("http")
        return (
            <Link target={isExternalLink ? "_blank" : undefined}
                key={uniqid()} to={isExternalLink ? (link?.link || "") : `/${locale}/${link.link}`}>
                <AppButton variant="banner-btn" >
                    {Content.GetTitleByLanguage(link)}
                </AppButton>
            </Link>
        )
    })

    const documentButtons = data?.fileUrl?.map(el => (
        <AppButton onClick={handleViewDocument(el)} key={uniqid()} variant="banner-btn" >
            {t("button.view")}
        </AppButton>
    ))

    return (
        <>
            <BackgroundImage src={data?.imageUrl || ""}>
                <Center h={200}>
                    <Box>
                        <Box mb={12}>
                            <Title c={COLORS.PRIMARY_COLOR} fz={{ base: 16, sm: 24 }}>
                                {Content.GetTitleByLanguage(data)}
                            </Title>
                            <Text c={COLORS.TRIOTERY_COLOR} fz={{ base: 14, sm: 16 }}>
                                {Content.GetTitleByLanguage({
                                    titleKg: data?.contentKg,
                                    titleEn: data?.contentEn,
                                    titleRu: data?.contentRu,
                                })}
                            </Text>
                        </Box>
                        <Flex align="center" gap={10} justify="center">
                            {linkButtons}
                            {documentButtons}
                        </Flex>
                    </Box>
                </Center>
            </BackgroundImage>
            <AppModal
                withCloseButton
                closeOnClickOutside
                opened={openedViewDoc}
                toggle={toggle} variant="document">
                {openedDocument &&
                    <AppIframe aspectRatio={3 / 4} width="100%" src={openedDocument} />}
            </AppModal>
        </>
    )
}
