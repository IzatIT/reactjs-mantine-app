"use client"
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import '@mantine/carousel/styles.css';
import '@mantine/code-highlight/styles.css';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/dropzone/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/nprogress/styles.css';
import '@mantine/spotlight/styles.css';
import '@mantine/tiptap/styles.css';
import "./index.scss"
import {useTranslation} from "react-i18next";
import {BrowserRouter} from "react-router-dom";
import {AppMantineProvider} from "src/shared/config/mantine-theme";

type Props = {
    children: React.ReactNode,
}

export function Providers({children}: Props) {
    const {i18n} = useTranslation();

    useEffect(() => {
        Cookies.set('locale', i18n.language, { expires: 7, sameSite: "strict"});
    }, [i18n.language])

    return (
            <BrowserRouter>
               <AppMantineProvider>
                   {children}
               </AppMantineProvider>
            </BrowserRouter>
    )
}
