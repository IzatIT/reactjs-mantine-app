"use client"
import {Categories, getCategory} from "src/entities/categories"
import { AdminAppShell } from "src/features"
import {  Flex } from "@mantine/core"
import { useEffect, useState } from "react"
import {useTranslation} from "react-i18next";
import {useNavigate, useParams} from "react-router-dom";
import {Content} from "src/shared/helpers/content";
import {AppButton} from "src/shared/ui/forms";
import {ContentInfo} from "src/shared/ui/content-info";

export const CategoriesDetailWidget = () => {
    const {t,i18n} = useTranslation()
    const locale = i18n.language
    const { id } = useParams<{ id: string }>()
    const [data, setData] = useState<Categories>()
    const router = useNavigate()
    const fetchData = async () => {
        if(id){
            const res = await getCategory(id)
            setData(res)
        }
    }

    useEffect(() => {
        fetchData()
    }, [id])

    const handleClickEdit = () => router(`/${locale}/admin/categories/${id}/edit`)

    const content = [
        { label: t("table.id"), value: data?.id },
        { label: t("table.titleKg"), value: data?.titleKg },
        { label: t("table.titleRu"), value: data?.titleRu },
        { label: t("table.parent"), value: Content.GetTitleByLanguage(data?.parentId) },
        { label: t("table.contentKg"), value: Content.HtmlRender(data?.contentKg) },
        { label: t("table.contentRu"), value: Content.HtmlRender(data?.contentRu) },

    ]

    return (
        <>
            <AdminAppShell pageTitle={t("table.titles.detail-category")}>
                <Flex justify="end">
                    <AppButton onClick={handleClickEdit} variant="sorting">
                        {t("button.edit")}
                    </AppButton>
                </Flex>
                {content && <ContentInfo data={content} />}
            </AdminAppShell>
        </>
    )
}
