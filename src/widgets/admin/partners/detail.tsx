"use client"
import {AttachmentPath} from "src/entities/attachments"
import {getPartner, Partners} from "src/entities/partners"
import { AdminAppShell } from "src/features"
import {Flex, Image} from "@mantine/core"
import { useEffect, useState } from "react"
import {useTranslation} from "react-i18next";
import {useNavigate, useParams} from "react-router-dom";
import {AppButton} from "src/shared/ui/forms";
import {ContentInfo} from "src/shared/ui/content-info";

export const PartnersDetailWidget = () => {
    const {t, i18n} = useTranslation()
    const locale = i18n.language
    const { id } = useParams<{ id: string }>()
    const [data, setData] = useState<Partners>()
    const router = useNavigate()
    const fetchData = async () => {
        if(id){
            const res = await getPartner(id)
            setData(res)
        }
    }

    useEffect(() => {
        fetchData()
    }, [id])

    const handleClickEdit = () =>router(`/${locale}/admin/partners/${id}/edit`)

    const content = [
        { label: t("table.id"), value: data?.id },
        { label: t("table.titleKg"), value: data?.titleKg },
        { label: t("table.titleRu"), value: data?.titleRu },
        {
            label: t("table.photo"),
            value: (
                <div>
                    <Image src={AttachmentPath.GetAttachmentUrl(data?.logo?.id)} width={150} height={150} alt=""/>
                </div>
            )
        },

    ]

    return (
        <>
            <AdminAppShell pageTitle={t("table.titles.detail-partners")}>
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
