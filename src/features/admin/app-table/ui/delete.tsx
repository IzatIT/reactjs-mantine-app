"use client"
import { COLORS } from "src/constants";
import { Center, Flex, Title } from "@mantine/core";
import {useTranslation} from "react-i18next";
import {AppButtonGroup} from "src/shared/ui/forms";
import {AppModal} from "src/shared/ui/modal";

type Props = {
    opened: boolean;
    toggle: () => void;
    onDelete: () => void;
}

export const DataDeleteFeature = ({
    opened,
    toggle,
    onDelete
}: Props) => {
    const {t} = useTranslation()

    return (
        <AppModal closeOnClickOutside opened={opened} toggle={toggle}>
            <Flex p={24} direction="column" gap={20}>
                <Title c={COLORS.PRIMARY_COLOR} fz={{ base: 18, sm: 24 }} ta="center">
                    {t("table.sure-to-delete")}
                </Title>
                <Center>
                    <AppButtonGroup
                        leftVariant="reset"
                        leftLabel={t("button.cancel")}
                        leftOnClick={toggle}
                        rightOnClick={onDelete}
                        rightLabel={t("button.delete")}
                    />
                </Center>
            </Flex>
        </AppModal>
    )
}
