"use client"
import {Categories, CategoriesFilter, searchCategories} from "src/entities/categories";
import {Center, Flex} from "@mantine/core";
import { useForm } from "@mantine/form";
import {getCategoriesFilterForm} from "../helpers";
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

export const CategoriesFilterFeature = ({ opened, toggle }: Props) => {
    const {t, i18n} = useTranslation()
    const [searchParams] = useSearchParams()
    const oldParams: CategoriesFilter = Object.fromEntries(searchParams);
    const router = useNavigate()
    const {pathname} = useLocation()
    const locale = i18n.language
    const [categories, setCategories] = useState<Categories[]>([])

    const fetchCategories = useCallback(async () => {
        const res = await searchCategories({
            filter: {},
            pageRequest: {limit: 100, page: 0},
            sorting: {sortBy: "ID", sortDirection: "DESC"},
        })
        setCategories(res?.content ?? [])
    }, [])
    const parentSelectDto = categories?.map(el => ({
        label: Content.GetTitleByLanguage(el, locale),
        value: `${el.id}`
    }))

    const form = useForm(getCategoriesFilterForm(oldParams))

    const handleSubmit = () => {
        const resUrl = Actions.HandleFilterFormSubmit<CategoriesFilter>({
            ...form.values,
        }, oldParams, pathname)
        router(resUrl);
        toggle()
    };

    const handleClearValues = () => {
        form.setInitialValues({
            title: "",
            content: "",
            parentId: undefined,
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
                           label={t("form.label.parent")}
                           data={parentSelectDto}
                           {...form.getInputProps("parentId")}
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
