"use client"
import { Center,  Grid, } from "@mantine/core"
import { useForm } from "@mantine/form"
import {  useState } from "react"
import {getInfoBlockForm} from "../helpers"
import {INFO_BLOCK_TYPES} from "src/constants";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {createInfoBlock, InfoBlock, InfoBlockForm, updateInfoBlock} from "src/entities/info_block";
import {
    AppButtonGroup,
    AppCheckBox,
    AppDateInput,
    AppDropzone,
    AppInput,
    AppSelect,
    AppTextEdtior
} from "src/shared/ui/forms";

type Props = {
    data?: InfoBlock
}

type InfoBlockFormAttachmentTypes = "photoAttachments" |  "fileAttachments" |  "videoAttachments"



export const InfoBlockFormFeature = ({ data }: Props) => {
    const router = useNavigate()
    const {i18n, t} = useTranslation()
    const locale = i18n.language
    const [loading, setLoading] = useState(false)

    const typeSelectDto = [
        {
            label: t(`form.label.${INFO_BLOCK_TYPES.MAIN_PAGE}`),
            value: INFO_BLOCK_TYPES.MAIN_PAGE
        }
    ]
    const form = useForm(getInfoBlockForm(data, t));

    const handleSubmit = async (values: InfoBlockForm) => {
        setLoading(true)
        let res
        if (data) {
            res = await updateInfoBlock(values)
        } else {
            res = await createInfoBlock(values)
        }
        setLoading(false)
        if (res?.status === 200) {
            router(`/${locale}/admin/info_block`)
        }
    }

    const handleSaveAsNew = async () => {
        const res = await createInfoBlock(form.values)
        setLoading(false)
        if (res?.status === 200) {
            router(`/${locale}/admin/info_block`)
        }
    }

    const handleCancel = () => {
        form.reset()
        router(`/${locale}/admin/info_block`)
    }


    const handleDeleteFile = (type: InfoBlockFormAttachmentTypes) => ({
        group,
        index,
        id
    }: HandleDeleteFileArgs) => {
        switch (group) {
            case "attachment": {
                if (id) {
                    form.removeListItem(`${type}.attachments`, index)
                    form.insertListItem(`${type}.toDelete`, id)
                }
                return;
            }
            case "file": {
                if (!id) {
                    form.removeListItem(`${type}.toCreate`, index)
                }
                return;
            }
        }
    }

    const handleReOrderFile = (type: InfoBlockFormAttachmentTypes) => ({ from, to, group }: HandleReOrderArgs) => {
        if (group === "file") {
            form.reorderListItem(`${type}.toCreate`, { from, to });
        } else if (group === "attachment") {
            const item = form.values?.[type]?.attachments?.[from];
            if (item) {
                form.insertListItem(`${type}.toUpdate`, { id: item.id, order: to });
                form.reorderListItem(`${type}.attachments`, { from, to });
            }
        }
    };

    const handleSaveCropedFiles = ({
        file,
        group,
        index,
        id
    }: HandleSaveCropedArgs) => {
        switch (group) {
            case "attachment": {
                if (id) {
                    form.removeListItem("photoAttachments.attachments", index)
                    form.insertListItem("photoAttachments.toDelete", id)
                    form.insertListItem("photoAttachments.toCreate", file)
                }
                return;
            }
            case "file": {
                if (!id) {
                    form.removeListItem("photoAttachments.toCreate", index)
                    form.insertListItem("photoAttachments.toCreate", file, index)
                }
                return;
            }
        }
    }

    const formFields = [
        { label: "titleKg", type: "input", span: 12 },
        { label: "titleRu", type: "input", span: 12 },
        { label: "contentKg", type: "textEditor", span: 12 },
        { label: "contentRu", type: "textEditor", span: 12 },
    ]

    return (
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <Grid gutter={24}>
                <Grid.Col>
                    <AppSelect searchable
                        label={t("form.label.type")}
                        data={typeSelectDto}
                        {...form.getInputProps("type")}
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
                    <AppDropzone
                        aspectRatio={16 / 9}
                        fileType="image"
                        handleDeleteFile={handleDeleteFile("photoAttachments")}
                        label={t("form.label.photoAttachments")}
                        handleSaveCroped={handleSaveCropedFiles}
                        handleReOrder={handleReOrderFile("photoAttachments")}
                        attachments={form.values.photoAttachments.attachments}
                        {...form.getInputProps("photoAttachments.toCreate")}
                    />
                </Grid.Col>
                <Grid.Col>
                    <AppDropzone
                        fileType="video"
                        handleDeleteFile={handleDeleteFile("videoAttachments")}
                        label={t("form.label.videoAttachments")}
                        handleReOrder={handleReOrderFile("videoAttachments")}
                        attachments={form.values.videoAttachments.attachments}
                        {...form.getInputProps("videoAttachments.toCreate")}
                    />
                </Grid.Col>
                <Grid.Col>
                    <AppDropzone
                        fileType="document"
                        handleDeleteFile={handleDeleteFile("fileAttachments")}
                        label={t("form.label.fileAttachmentsKg")}
                        handleReOrder={handleReOrderFile("fileAttachments")}
                        attachments={form.values.fileAttachments.attachments}
                        {...form.getInputProps("fileAttachmentsKg.toCreate")}
                    />
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
