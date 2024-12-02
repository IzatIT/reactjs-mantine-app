"use client"
import {ProductsFilter} from "src/entities/products";
import {Categories, searchCategories} from "src/entities/categories";
import { Center, Flex } from "@mantine/core";
import { useForm } from "@mantine/form";
import { getProductsFilterForm } from "../helpers";
import {useCallback, useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {Content} from "src/shared/helpers/content";
import {Actions} from "src/shared/helpers/actions";
import {AppModal} from "src/shared/ui/modal";
import {AppButtonGroup, AppInput, AppSelect} from "src/shared/ui/forms";

type Props = {
    opened: boolean;
    toggle: () => void;
}

export const ProductsFilterFeature = ({ opened, toggle }: Props) => {
    const {t, i18n} = useTranslation()
    const locale =i18n.language
    const [searchParams] = useSearchParams()
    const oldParams: ProductsFilter = Object.fromEntries(searchParams);
    const router = useNavigate()
    const {pathname} = useLocation()
    const [categories, setCategories] = useState<Categories[]>([])

    const fetchCategories = useCallback(async () => {
        const res = await searchCategories({
            sorting: {
                sortBy: "ID",
                sortDirection: "DESC",
            },
            filter: {},
            pageRequest: {limit: 100, page: 0}
        })
        setCategories(res?.content ?? [])
    }, [])
    const categorySelectDto = categories?.map(el => ({
        label: Content.GetTitleByLanguage(el, locale),
        value: `${el.id}`
    }))
    const form = useForm(getProductsFilterForm(oldParams))

    const handleSubmit = () => {
        const resUrl = Actions.HandleFilterFormSubmit<ProductsFilter>({
            ...form.values,
        }, oldParams, pathname)
        router(resUrl);
        toggle()
    };

    const handleClearValues = () => {
        form.setInitialValues({
            title: "",
            content: "",
            categoryId: undefined
        })
        form.reset()
    }

    useEffect(() => {
        fetchCategories()
    }, []);
    return (
        <AppModal closeOnClickOutside opened={opened} toggle={toggle}>
            <Flex p={24} direction="column" gap={20}>
                <AppSelect searchable
                           label={t("form.label.category")}
                           data={categorySelectDto}
                           {...form.getInputProps("categoryId")}
                />
                <AppInput
                    label={t("form.label.title")}
                    {...form.getInputProps("title")} />
                <AppInput
                    label={t("form.label.content")}
                    {...form.getInputProps("content")} />
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
