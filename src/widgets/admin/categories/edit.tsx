"use client"
import {Categories, getCategory} from "src/entities/categories"
import { AdminAppShell, CategoriesFormFeature } from "src/features"
import { useEffect, useState } from "react"
import {useTranslation} from "react-i18next";
import {useParams} from "react-router-dom";

export const CategoriesEditWidget = () => {
    const {t} = useTranslation()
    const { id } = useParams<{ id: string }>()
    const [data, setData] = useState<Categories>()

    const fetchData = async () => {
        if(id){
            const res = await getCategory(id)
            setData(res)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <AdminAppShell pageTitle={t("table.titles.edit-category")}>
            {data && <CategoriesFormFeature data={data} />}
        </AdminAppShell>
    )
}
