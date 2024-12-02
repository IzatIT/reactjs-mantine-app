"use client"
import { Box, Flex, Image, Text, Title, } from "@mantine/core";
import uniqid from "uniqid";
import {useTranslation} from "react-i18next";
import {Content} from "src/shared/helpers/content";
import {AppIframe} from "src/shared/ui/iframe";
import {AppAccordion} from "src/shared/ui/accordion";

type Props = {
    data: PageAccordionCardProps[]
}

export type PageAccordionCardProps = {
    titleKg?: string;
    titleRu?: string;
    titleEn?: string;
    contentKg?: string;
    contentRu?: string;
    contentEn?: string;
    imageUrl?: string[];
    fileUrl?: string[];
}

export const PageAccordionCard = ({ data }: Props) => {
    const {i18n} = useTranslation()
    const locale = i18n.language
    const accordionData = data?.map(el => ({
        control: <Title fz={18} c="white">{Content.GetTitleByLanguage(el)}</Title>,
        panel: <Box>
            <Text c="white">
                {Content.GetTitleByLanguage({
                    titleKg: el.contentKg,
                    titleRu: el.contentRu,
                    titleEn: el.contentEn,
                }, locale)}
            </Text>
            <Flex>
                {el.imageUrl?.map(image => <Image key={image} maw={300} mah={300} alt="" src={image} />)}
                {el.fileUrl?.map(file => <AppIframe key={file} src={file} aspectRatio={3 / 4} width={300} />)}
            </Flex>
        </Box>,
        key: uniqid()
    }))


    return (
        <AppAccordion
            variant="page"
            data={accordionData}
        />
    )
}
