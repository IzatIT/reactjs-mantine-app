"use client"
import {Categories, searchCategories} from "src/entities/categories"
import {createProduct, Products, ProductsForm, updateProduct} from "src/entities/products"
import { Center,  Grid, } from "@mantine/core"
import { useForm } from "@mantine/form"
import {useCallback, useEffect, useState} from "react"
import { getProductsForm } from "../helpers"
import {ProductCharacteristicItem} from "src/features/admin/products/ui/product-characteristics";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {Content} from "src/shared/helpers/content";
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
    data?: Products
}


type ProductsFormAttachmentTypes = "photoAttachments" |  "fileAttachments" |  "videoAttachments"

export const ProductsFormFeature = ({ data }: Props) => {
    const router = useNavigate()
    const {t,i18n} = useTranslation()
    const locale = i18n.language
    const [loading, setLoading] = useState(false)
    const [categories, setCategories] = useState<Categories[]>([])
    const form = useForm<ProductsForm>(getProductsForm(data, t));

    const fetchCategories = useCallback(async () => {
        const res = await searchCategories({
            filter: {},
            pageRequest: {limit: 100, page: 0},
            sorting: {sortBy: "ID", sortDirection: "DESC"},
        })
        setCategories(res?.content ?? [])
    }, [])

    const categorySelectDto = categories?.filter(el => !el.children?.length)?.map(el => ({
        label: Content.GetTitleByLanguage(el, locale),
        value: `${el.id}`
    }))


    const handleSubmit = async (values: ProductsForm) => {
        setLoading(true)
        let res
        if (data) {
            res = await updateProduct(values)
        } else {
            res = await createProduct(values)
        }
        setLoading(false)
        if (res?.status === 200) {
            router(`/${locale}/admin/products`)
        }
    }


    const handleSaveAsNew = async () => {
        const res = await createProduct(form.values)
        setLoading(false)
        if (res?.status === 200) {
            router(`/${locale}/admin/products`)
        }
    }

    const handleCancel = () => {
        form.reset()
        router(`/${locale}/admin/products`)
    }


    const handleDeleteFile = (type: ProductsFormAttachmentTypes) => ({
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
        { label: "contentKg", type: "textEditor", span: 12 },
        { label: "contentRu", type: "textEditor", span: 12 },
    ]

    useEffect(() => {
        fetchCategories()
    }, []);

    useEffect(() => {
        if(form.values.categoryId){
            categories?.find(el => `${el.id}` === `${form.values.categoryId}`)?.characteristics?.forEach((el) => {
                form.insertListItem(`characteristics`, {
                    label: el,
                    valueKg: "",
                    valueRu: ""
                })
            })
        }
    }, [form.values.categoryId]);
    return (
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <Grid gutter={24}>
                <Grid.Col>
                    <AppSelect searchable
                        label={t("form.label.category")}
                        data={categorySelectDto}
                        {...form.getInputProps("categoryId")}
                        value={`${form.values.categoryId}`}
                        onChange={(value) => {
                            const changedValueId = value ? parseInt(value) : undefined
                            form.setFieldValue("categoryId", changedValueId)
                        }}
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
                {form.values.characteristics?.map((el,index ) => (
                    <ProductCharacteristicItem
                        key={el.label.id}
                        form={form}
                        index={index}
                        label={el.label}/>
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
                    <AppDropzone
                        aspectRatio={16 / 9}
                        fileType="video"
                        handleDeleteFile={handleDeleteFile("videoAttachments")}
                        label={t("form.label.videoAttachments")}
                        attachments={form.values.videoAttachments.attachments}
                        {...form.getInputProps("videoAttachments.toCreate")}
                    />
                </Grid.Col>
                <Grid.Col>
                    <AppDropzone
                        aspectRatio={16 / 9}
                        fileType="document"
                        handleDeleteFile={handleDeleteFile("fileAttachments")}
                        label={t("form.label.fileAttachments")}
                        attachments={form.values.fileAttachments.attachments}
                        {...form.getInputProps("fileAttachments.toCreate")}
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
