"use client"
import { Center, Flex } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect } from "react";
import {ProductsFilter} from "src/entities/products";
import {useTranslation} from "react-i18next";
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {Actions} from "src/shared/helpers/actions";
import {AppModal} from "src/shared/ui/modal";
import {AppButtonGroup, AppSelect} from "src/shared/ui/forms";

type Props = {
    opened: boolean;
    close: () => void;
    sortByMethods?: {
        label: string;
        value: string;
    }[]
}

const sortByDefaultDto = [
    { label: "ID", value: "ID" },
]

export const DataSortingFeature = ({
    opened,
    close,
    sortByMethods = sortByDefaultDto
}: Props) => {
    const {t} = useTranslation()
    const [searchParams] = useSearchParams()
    const oldParams: ProductsFilter = Object.fromEntries(searchParams);

    const form = useForm<SortRequest>({
        initialValues: {
            sortBy: "ID",
            sortDirection: "DESC"
        }
    })

    const router = useNavigate()
    const {pathname} = useLocation()

    const handleSubmit = () => {
        const resUrl = Actions.HandleFilterFormSubmit<SortRequest>(form.values, oldParams, pathname)
        router(resUrl);
        close()
    };

    const sortDirectionSelectDto = [
        { label: t("form.label.asc"), value: "ASC" },
        { label: t("form.label.desc"), value: "DESC" },
    ]

    useEffect(() => {
        handleSubmit()
    }, [])
    return (
        <AppModal closeOnClickOutside opened={opened} toggle={close}>
            <Flex p={24} direction="column" gap={20}>
                <AppSelect
                    label={t("form.label.sortBy")}
                    data={sortByMethods}
                    {...form.getInputProps("sortBy")}
                />
                <AppSelect
                    label={t("form.label.sortDirection")}
                    data={sortDirectionSelectDto}
                    {...form.getInputProps("sortDirection")}
                />
                <Center>
                    <AppButtonGroup
                        leftLabel={t("button.clear")}
                        leftOnClick={() => form.reset()}
                        leftVariant="clear"
                        centerLabel={t("button.cancel")}
                        centerOnClick={close}
                        rightOnClick={handleSubmit}
                        rightLabel={t("button.submit")}
                    />
                </Center>
            </Flex>
        </AppModal>
    )
}
