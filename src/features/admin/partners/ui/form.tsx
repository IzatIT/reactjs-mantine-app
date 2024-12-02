"use client"
import { Center,  Grid, } from "@mantine/core"
import { useForm } from "@mantine/form"
import {useState} from "react"
import {getPartnersForm} from "src/features/admin/partners/helpers";
import {createPartner, Partners, PartnersForm, updatePartner} from "src/entities/partners";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import {AppButtonGroup, AppCheckBox, AppDateInput, AppDropzone, AppInput, AppTextEdtior} from "src/shared/ui/forms";

type Props = {
    data?: Partners
}

export const PartnersFormFeature = ({ data }: Props) => {
    const router = useNavigate()
    const {t, i18n} = useTranslation()
    const locale = i18n.language
    const [loading, setLoading] = useState(false)

    const form = useForm<PartnersForm>(getPartnersForm(data, t));

    const handleSubmit = async (values: PartnersForm) => {
        setLoading(true)
        let res
        if (data) {
            res = await updatePartner(values)
        } else {
            res = await createPartner(values)
        }
        setLoading(false)
        if (res?.status === 200) {
            router(`/${locale}/admin/partners`)
        }
    }


    const handleSaveAsNew = async () => {
        const res = await createPartner(form.values)
        setLoading(false)
        if (res?.status === 200) {
            router(`/${locale}/admin/partners`)
        }
    }

    const handleCancel = () => {
        form.reset()
        router(`/${locale}/admin/partners`)
    }


    const handleDeleteFile = (type: "photoAttachments") => (
        {
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
    ]

    return (
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <Grid gutter={24}>
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
                        attachments={form.values.photoAttachments.attachments}
                        {...form.getInputProps("photoAttachments.toCreate")}
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
