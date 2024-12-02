import {UseFormReturnType} from "@mantine/form";
import {ProductsForm} from "src/entities/products";
import {Grid, Title} from "@mantine/core";
import {LocaleTitle} from "src/types";
import {COLORS} from "src/constants";
import {useTranslation} from "react-i18next";
import {Content} from "src/shared/helpers/content";
import {AppInput} from "src/shared/ui/forms";

type VideoLinksItemProps = {
    form: UseFormReturnType<ProductsForm, (values: ProductsForm) => ProductsForm>;
    index: number
    label?: LocaleTitle
}

export const ProductCharacteristicItem = ({ form, index, label }: VideoLinksItemProps) => {
    const {t,i18n} = useTranslation()
    const locale = i18n.language

    return (
        <Grid.Col key={index}>
            <Title fz={24} lh={1.3} c={COLORS.PRIMARY_COLOR} style={{textDecoration: "underline"}}>
                {Content.GetTitleByLanguage(label, locale)}:
            </Title>
            <Grid w="100%">
                <Grid.Col span={{base: 12, sm: 6}}>
                    <AppInput
                        label={t("form.label.valueRu")}
                        {...form.getInputProps(`characteristics.${index}.valueRu`)} />
                </Grid.Col>
                <Grid.Col span={{base: 12, sm: 6}}>
                    <AppInput
                        label={t("form.label.valueKg")}
                        {...form.getInputProps(`characteristics.${index}.valueKg`)} />
                </Grid.Col>
            </Grid>
        </Grid.Col>
    )
}