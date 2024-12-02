"use client"
import {getInfoBlock, InfoBlock} from "src/entities/info_block"
import {AdminAppShell, InfoBlockFormFeature} from "src/features"
import { useEffect, useState } from "react"
import {useTranslation} from "react-i18next";
import {useParams} from "react-router-dom";

export const InfoBlockEditWidget = () => {
    const {t} = useTranslation()
    const { id } = useParams<{ id: string }>()
    const [data, setData] = useState<InfoBlock>()

    const fetchData = async () => {
        if(id){
            const res = await getInfoBlock(id)
            setData(res)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <AdminAppShell pageTitle={t("table.titles.edit-info_block")}>
            {data && <InfoBlockFormFeature data={data} />}
        </AdminAppShell>
    )
}
