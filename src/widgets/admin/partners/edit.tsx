"use client"
import { getPartner, Partners} from "src/entities/partners"
import {AdminAppShell, PartnersFormFeature} from "src/features"
import { useEffect, useState } from "react"
import {useTranslation} from "react-i18next";
import {useParams} from "react-router-dom";

export const PartnersEditWidget = () => {
    const {t} = useTranslation()
    const { id } = useParams<{ id: string }>()
    const [data, setData] = useState<Partners>()

    const fetchData = async () => {
        if(id){
            const res = await getPartner(id)
            setData(res)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <AdminAppShell pageTitle={t("table.titles.edit-partners")}>
            {data && <PartnersFormFeature data={data} />}
        </AdminAppShell>
    )
}
