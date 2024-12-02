"use client"
import {changePassword, ChangePasswordRequest, logout} from "src/entities/auth";
import { useDisclosure } from "@mantine/hooks";
import { IconLock, IconLogout, IconUserHexagon, IconUserScan } from "@tabler/icons-react";
import { AppActions } from "src/shared/ui/choose-actions";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import {useForm} from "@mantine/form";
import {Notify} from "src/shared/helpers/notification";
import {ChangePasswordFeature} from "src/features/admin/app-shell/ui/change-password";
import {AppModal} from "src/shared/ui/modal";
import {useState} from "react";

export const ProfileActionsFeature = () => {
    const router = useNavigate()
    const [opened, { toggle, close }] = useDisclosure()
    const {t,i18n} = useTranslation()
    const locale = i18n.language
    const [loading, setIsLoading] = useState<boolean>(false);

    const handleLogout = async () => {
        logout()
        router(`/${locale}`)
    };

    const actions = [
        {
            icon: <IconUserHexagon />,
            title: t("button.profile"),
            onClick: () => router(`/${locale}/admin/profile`)
        },
        {
            icon: <IconLock />,
            title: t("button.changePassword"),
            onClick: toggle,
        },
        {
            icon: <IconLogout />,
            title: t("button.logout"),
            onClick: handleLogout,
        },
    ];

    const form = useForm<ChangePasswordRequest>({
        initialValues: {
            newPassword: "",
            oldPassword: "",
            repeatPassword: ""
        },
         validate: {
             newPassword: (value, values) => {
                 if(!value || value.length < 6) return  t("form.errors.minLength6")
                 if (value !== values.repeatPassword) return t("form.errors.mismatch");
                 return null
             },
             oldPassword: (n) => !n && t("form.errors.required"),
             repeatPassword: (value, values) => {
                 if (!value || value.length < 6) return t("form.errors.minLength6");
                 if (value !== values.newPassword) return t("form.errors.mismatch");
                 return null;
             }
         }
    })

    const handleSubmit = async (values: ChangePasswordRequest) => {
        setIsLoading(true)
        const res = await changePassword(values)
        if(res?.status === 200) {
            Notify.ShowSuccess()
            close()
        }
        setIsLoading(false)
    }

    return (
        <>
            <AppActions
                target={
                    <IconUserScan
                        strokeWidth={1}
                        style={{ cursor: "pointer" }}
                        size={36} />
                }
                actions={actions}
            />
            <AppModal opened={opened} toggle={toggle}>
                <form onSubmit={form.onSubmit(handleSubmit)}>
                    <ChangePasswordFeature
                        loading={loading}
                        handleCancel={toggle}
                        newPasswordProps={form.getInputProps("newPassword")}
                        oldPasswordProps={form.getInputProps("oldPassword")}
                        repeatNewPasswordProps={form.getInputProps("repeatPassword")}
                    />
                </form>
            </AppModal>
        </>
    )
}
