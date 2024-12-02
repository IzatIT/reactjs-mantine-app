"use client"
import {getInfoBlock, InfoBlock} from "src/entities/info_block"
import {Attachment, AttachmentPath} from "src/entities/attachments"
import { AdminAppShell } from "src/features"
import { Box, Flex, Image } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { useEffect, useState } from "react"
import {useTranslation} from "react-i18next";
import {useNavigate, useParams} from "react-router-dom";
import {AppIframe} from "src/shared/ui/iframe";
import {Content} from "src/shared/helpers/content";
import {AppButton} from "src/shared/ui/forms";
import {ContentInfo} from "src/shared/ui/content-info";
import {AppModal} from "src/shared/ui/modal";

export const InfoBlockDetailWidget = () => {
    const {t,i18n} = useTranslation()
    const locale = i18n.language
    const { id } = useParams<{ id: string }>()
    const [openedFileView, { toggle: toggleFileView }] = useDisclosure()
    const [data, setData] = useState<InfoBlock>()
    const [activeImageData, setActiveImageData] = useState<Attachment>()
    const router = useNavigate()

    const fetchData = async () => {
       if(id){
           const res = await getInfoBlock(id)
           setData(res)
       }
    }

    useEffect(() => {
        fetchData()
    }, [id])

    const handleClickEdit = () => router(`/${locale}/admin/info_block/${id}/edit`)

    const handleClickFileView = (file: Attachment) => () => {
        setActiveImageData(file)
        toggleFileView()
    }


    const renderAttachments = (attachments: Attachment[], type: "image" | "video" | "file") => (
        <Flex wrap="wrap" gap={10}>
            {attachments.map(el => (
                <Box key={el.id} w={type === "image" ? 170 : 300} h={type === "image" ? 110 : 100}>
                    {type === "image" && (
                        <Image
                            onClick={handleClickFileView(el)}
                            width={150} height={110}
                            style={{ objectFit: "contain", cursor: "pointer" }}
                            src={AttachmentPath.GetAttachmentUrl(el.id)}
                            alt=""
                        />
                    )}
                    {type === "video" && (
                        <video
                            width={300} height={100} style={{ cursor: "pointer" }}
                            src={AttachmentPath.GetAttachmentUrl(el.id)}
                            onClick={handleClickFileView(el)}
                        />
                    )}
                    {type === "file" && (
                        <AppIframe aspectRatio={3 / 4} width={150} src={AttachmentPath.GetAttachmentUrl(el.id)} />
                    )}
                </Box>
            ))}
        </Flex>
    )

    const content = [
        { label: t("table.id"), value: data?.id },
        { label: t("table.type"), value: data?.type,},
        { label: t("table.titleKg"), value: data?.titleKg },
        { label: t("table.titleRu"), value: data?.titleRu },
        { label: t("table.contentKg"), value: Content.HtmlRender(data?.contentKg) },
        { label: t("table.contentRu"), value: Content.HtmlRender(data?.contentRu) },
        { label: t("table.videoAttachments"), value: renderAttachments(data?.videoAttachments || [], "video") },
        { label: t("table.photoAttachments"), value: renderAttachments(data?.photoAttachments || [], "image") },
        { label: t("table.fileAttachments"), value: renderAttachments(data?.fileAttachments || [], "file") }
    ]

    const fileUrl = AttachmentPath.GetAttachmentUrl(activeImageData?.id)

    return (
        <>
            <AdminAppShell pageTitle={t("table.titles.detail-info_block")}>
                <Flex justify="end">
                    <AppButton onClick={handleClickEdit} variant="sorting">
                        {t("button.edit")}
                    </AppButton>
                </Flex>
                {content && <ContentInfo data={content} />}
            </AdminAppShell>
            <AppModal opened={openedFileView} toggle={toggleFileView} closeOnClickOutside>
                {activeImageData?.type.includes("image") ? (
                    <Image width="100%" height="auto" style={{ objectFit: "contain" }} src={fileUrl} alt="" />
                ) : activeImageData?.type.includes("video") ? (
                    <video width="100%" height="auto" src={fileUrl} />
                ) :(
                    <AppIframe aspectRatio={3 / 4} width="100%" src={fileUrl} />
                )}
            </AppModal>
        </>
    )
}
