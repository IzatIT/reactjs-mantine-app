"use client"
import {Categories, CategoriesForm, createCategory, searchCategories, updateCategory} from "src/entities/categories"
import { Box, Center, Grid, Title } from "@mantine/core"
import { useForm } from "@mantine/form"
import {useCallback, useEffect, useState} from "react"
import { getCategoriesForm } from "../helpers"
import {COLORS} from "src/constants";
import {CharacteristicItem} from "src/features/admin/categories/ui/characteristic";
import {IconPlus} from "@tabler/icons-react";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import {Content} from "src/shared/helpers/content";
import {
    AppButton,
    AppButtonGroup,
    AppCheckBox,
    AppDateInput,
    AppInput,
    AppSelect,
    AppTextEdtior
} from "src/shared/ui/forms";

type Props = {
    data?: Categories
}

export const CategoriesFormFeature = ({ data }: Props) => {
    const router = useNavigate()
    const {t, i18n} = useTranslation()
    const locale = i18n.language
    const [loading, setLoading] = useState(false)
    const [categories, setCategories] = useState<Categories[]>([])
    const form = useForm<CategoriesForm>(getCategoriesForm(data, t));

    const fetchCategories = useCallback(async () => {
        const res = await searchCategories({
            filter: {},
            sorting: {sortBy: "ID", sortDirection: "DESC"},
            pageRequest: {limit: 100, page: 0}
        })
        setCategories(res?.content ?? [])
    }, [])

    const parentSelectDto = categories?.filter(el => el.id !== data?.id)?.map(el => ({
        label: Content.GetTitleByLanguage(el, locale),
        value: `${el.id}`
    }))


    const handleSubmit = async (values: CategoriesForm) => {
        setLoading(true)
        let res
        if (data) {
            res = await updateCategory(values)
        } else {
            res = await createCategory(values)
        }
        setLoading(false)
        if (res?.status === 200) {
            router(`/${locale}/admin/categories`)
        }
    }

    const handleSaveAsNew = async () => {
        const res = await createCategory(form.values)
        setLoading(false)
        if (res?.status === 200) {
            router(`/${locale}/admin/categories`)
        }
    }

    const handleCancel = () => {
        form.reset()
        router(`/${locale}/admin/categories`)
    }

    const formFields = [
        { label: "titleKg", type: "input", span: 12 },
        { label: "titleRu", type: "input", span: 12 },
        { label: "contentKg", type: "textEditor", span: 12 },
        { label: "contentRu", type: "textEditor", span: 12 },
    ]

    const addNewCharacteristic = () => {
        form.insertListItem("characteristics", {
            titleKg: "",
            titleRu: "",
        })
    }

    useEffect(() => {
        fetchCategories()
    }, []);
    return (
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <Grid gutter={24}>
                <Grid.Col>
                    <AppSelect searchable
                        label={t("form.label.parent")}
                        {...form.getInputProps("parentId")}
                        data={parentSelectDto}
                        value={`${form.values.parentId}`}
                    />
                </Grid.Col>
                {formFields.map((field, index) => (
                    <Grid.Col key={index} span={field.span}>
                        {field.type === "checkbox" ? (
                            <AppCheckBox
                                label={t(`form.label.${field.label}`)}
                                {...form.getInputProps(field.label)}
                                checked={form.getInputProps(field.label).value} />
                        ) : field.type === "date" ? (
                            <AppDateInput
                                label={t(`form.label.${field.label}`)}
                                {...form.getInputProps(field.label)} />
                        ) : field.type === "input" ? (
                            <AppInput
                                label={t(`form.label.${field.label}`)}
                                {...form.getInputProps(field.label)} />
                        ) : (
                            <AppTextEdtior
                                label={t(`form.label.${field.label}`)}
                                {...form.getInputProps(field.label)}
                            />
                        )}
                    </Grid.Col>
                ))}

                <Grid.Col>
                    <Title c={COLORS.PRIMARY_COLOR} fz={{ base: 18, sm: 24 }} ta="center">
                        {t("section.titles.characteristic")}
                    </Title>
                    <Grid >
                        {form.values?.characteristics?.map((_, index) => (
                            <CharacteristicItem key={index} form={form} index={index} />
                        ))}
                    </Grid>
                    <Box mt={16}>
                        <AppButton onClick={addNewCharacteristic} variant="filter">
                            <IconPlus size={20} />
                        </AppButton>
                    </Box>
                </Grid.Col>

                <Grid.Col>
                    <Center>
                        <AppButtonGroup
                            loading={loading}
                            leftLabel={t("button.cancel")}
                            rightLabel={t("button.save")}
                            leftOnClick={handleCancel}
                            rightOnClick={form.onSubmit(handleSubmit)}
                            rightType="submit"
                            centerLabel={data && t("button.save-as-new")}
                            centerOnClick={data && handleSaveAsNew}
                            saveAsNew={!!data}
                        />
                    </Center>
                </Grid.Col>
            </Grid>
        </form>
    )
}
