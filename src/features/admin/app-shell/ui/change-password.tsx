import { Box, Flex, Title } from "@mantine/core";
import {useTranslation} from "react-i18next";
import {AppButton, AppInput} from "src/shared/ui/forms";

type Props = {
    handleCancel: () => void;
    loading: boolean;
    oldPasswordProps: GetInputPropsReturnType;
    newPasswordProps: GetInputPropsReturnType;
    repeatNewPasswordProps?: GetInputPropsReturnType;
}

export const ChangePasswordFeature = ({
    handleCancel,
    newPasswordProps,
    oldPasswordProps,
    repeatNewPasswordProps,
    loading
}: Props) => {
    const {t} = useTranslation()

    return (
        <Box>
            <Title c="white" fz={{ base: 18, sm: 24 }} ta="center">
                {t("button.changePassword")}
            </Title>
            <Box my={30}>
                <AppInput
                    type="password"
                    label={t("form.label.currentPassword")}
                    {...oldPasswordProps}
                />
            </Box>
            <Box my={30}>
                <AppInput
                    type="password"
                    label={t("form.label.newPassword")}
                    {...newPasswordProps}
                />
            </Box>
            {repeatNewPasswordProps && <Box mb={30}>
                <AppInput
                    type="password"
                    label={t("form.label.repeatNewPassword")}
                    {...repeatNewPasswordProps}
                />
            </Box>}
            <Flex w="100%" justify="space-evenly">
                <AppButton loading={loading} onClick={handleCancel} variant="default">
                    {t("button.cancel")}
                </AppButton>
                <AppButton loading={loading} type="submit" variant="default">
                    {t("button.submit")}
                </AppButton>
            </Flex>
        </Box>
    )
}
