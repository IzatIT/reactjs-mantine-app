"use client"
import {getProduct, Products,} from "src/entities/products"
import {AdminAppShell, ProductsFormFeature} from "src/features"
import { useEffect, useState } from "react"
import {useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";

export const ProductsEditWidget = () => {
    const {t} = useTranslation()
    const { id } = useParams<{ id: string }>()
    const [data, setData] = useState<Products>()

    const fetchNews = async () => {
        if(id){
            const res = await getProduct(id)
            setData(res)
        }
    }

    useEffect(() => {
        fetchNews()
    }, [])

    return (
        <AdminAppShell pageTitle={t("table.titles.edit-product")}>
            {data && <ProductsFormFeature data={data} />}
        </AdminAppShell>
    )
}
