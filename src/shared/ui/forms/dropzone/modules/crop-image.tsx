"use client"
import { Box } from "@mantine/core";
import "cropperjs/dist/cropper.css";
import { useRef } from "react";
import Cropper, { ReactCropperElement } from "react-cropper";
import { AppButton } from "../../button";
import { useTranslation } from "react-i18next";
import {FileActions} from "src/shared/helpers/file-actions";

type Props = {
    fileUrl: string;
    handleSaveCroped: (file: File) => void;
    aspectRatio?: number;
    closeModal: () => void;
    fileName: string;
}

export const AppImageCropper = ({ fileUrl, aspectRatio = 16 / 9, handleSaveCroped, closeModal, fileName }: Props) => {
    const { t } = useTranslation()
    const cropperRef = useRef<ReactCropperElement>(null);

    const onCrop = () => {
        const cropper = cropperRef.current?.cropper;
        const imageUrl = cropper?.getCroppedCanvas().toDataURL("image/png", 1.0)
        if (imageUrl) {
            const imageFile: File = FileActions.ConvertToFileFromBase64(imageUrl, "image/png", fileName)
            handleSaveCroped(imageFile)
        }
        closeModal()
    };

    return (
        <>
            <Cropper
                src={fileUrl}
                style={{ height: "100%", width: "100%" }}
                aspectRatio={aspectRatio}
                initialAspectRatio={16 / 9}
                guides={false}
                ref={cropperRef}
            />
            <Box mt={10}>
                <AppButton variant="submit" onClick={onCrop}>
                    {t("button.save")}
                </AppButton>
            </Box>
        </>
    )
}
