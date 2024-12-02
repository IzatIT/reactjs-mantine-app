"use client"
import {AppealsFilter} from "src/entities/appeals";
import { Center, Flex } from "@mantine/core";
import { useForm } from "@mantine/form";
import { getAppealsFilterForm } from "../helpers";
import {useTranslation} from "react-i18next";
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {Actions} from "src/shared/helpers/actions";
import {AppModal} from "src/shared/ui/modal";
import {AppButtonGroup, AppInput} from "src/shared/ui/forms";

type Props = {
    opened: boolean;
    toggle: () => void;
}

export const AppealsFilterFeature = ({ opened, toggle }: Props) => {
    const {t} = useTranslation()
    const [searchParams] = useSearchParams()
    const oldParams: AppealsFilter = Object.fromEntries(searchParams);
    const router = useNavigate()
    const {pathname} = useLocation()

    const form = useForm(getAppealsFilterForm(oldParams))

    const handleSubmit = () => {
        const resUrl = Actions.HandleFilterFormSubmit<AppealsFilter>({
            ...form.values,
        }, oldParams, pathname)
        router(resUrl);
        toggle()
    };

    const handleClearValues = () => {
        form.setInitialValues({
            title: "",
        })
        form.reset()
    }

    return (
        <AppModal closeOnClickOutside opened={opened} toggle={toggle}>
            <Flex p={24} direction="column" gap={20}>
                <AppInput
                    label={t("form.label.title")}
                    {...form.getInputProps("title")} />
                <Center>
                    <AppButtonGroup
                        leftLabel={t("button.clear")}
                        leftOnClick={handleClearValues}
                        leftVariant="clear"
                        centerLabel={t("button.cancel")}
                        centerOnClick={toggle}
                        rightOnClick={handleSubmit}
                        rightLabel={t("button.submit")}
                    />
                </Center>
            </Flex>
        </AppModal>
    )
}
