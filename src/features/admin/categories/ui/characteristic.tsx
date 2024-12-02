import {UseFormReturnType} from "@mantine/form";
import {CategoriesForm} from "src/entities/categories";
import {IconTrash} from "@tabler/icons-react";
import {Box, Grid} from "@mantine/core";
import {useTranslation} from "react-i18next";
import {AppButton, AppInput} from "src/shared/ui/forms";

type VideoLinksItemProps = {
    form: UseFormReturnType<CategoriesForm, (values: CategoriesForm) => CategoriesForm>;
    index: number
}

export const CharacteristicItem = ({ form, index }: VideoLinksItemProps) => {
    const {t} = useTranslation()

    const removeListItem = (index: number) => () => {
        form.removeListItem("characteristics", index)
    }

    return (
        <Grid.Col key={index}>
            <Box w="100%">
                <AppInput
                    label={t("form.label.titleRu")}
                    {...form.getInputProps(`characteristics.${index}.titleRu`)} />
                <AppInput
                    label={t("form.label.titleKg")}
                    {...form.getInputProps(`characteristics.${index}.titleKg`)} />
                <Box mt={15}>
                    <AppButton onClick={removeListItem(index)} variant="reset">
                        <IconTrash color="orange" size={24}/>
                    </AppButton>
                </Box>
            </Box>
        </Grid.Col>
    )
}