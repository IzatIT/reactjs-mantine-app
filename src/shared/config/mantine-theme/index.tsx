"use client"
import { MantineProvider, createTheme } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { FC } from "react";
import { AppThemeProviderProps } from "./types";
import {Actions} from "src/shared/helpers/actions";

export const AppMantineProvider: FC<AppThemeProviderProps> = ({ children }) => {
    return (
        <MantineProvider theme={theme}>
            <Notifications />
            {children}
        </MantineProvider>
    );
};

const theme = createTheme({
    fontFamily: "Rubik",
    fontFamilyMonospace: "Rubik",
    breakpoints: {
        xs4: "350px",
        xs3: "400px",
        xs2: "470px",
        xs: "576px",
        sm: "768px",
        md: "992px",
        lg: "1200px",
        xl: "1400px",
        xl2: "1600px",
        xl3: "1800px",
        xl4: "2000px",
    },

    fontSizes: {
        xs: "12px",
        sm: "14px",
        md: "16px",
        lg: "18px",
        xl: "20px",
        xl2: "24px",
        xl3: "28px",
        xl4: "32px",
        xl5: "40px",
    },
    headings: {
        sizes: {
            h1: {
                fontSize: "32px",
                fontWeight: "500",
                lineHeight: "40px",
            },
            h2: {
                fontSize: "24px",
                fontWeight: "500",
                lineHeight: "24px",
            },
            h3: {
                fontSize: "20px",
                fontWeight: "500",
                lineHeight: "20px",
            },
            h4: {
                fontSize: "18px",
                fontWeight: "500",
                lineHeight: "24px",
            },
            h5: {
                fontSize: "16px",
                fontWeight: "500",
                lineHeight: "16px",
            },
            h6: {
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "14px",
            },
        },
    },
    colors: {
        baseDark: Actions.GenerateArrayFrom("#1E305E", 10),
        primaryDark: Actions.GenerateArrayFrom("#1E305E"),
        secondaryDark: Actions.GenerateArrayFrom("#192A56"),
        base: Actions.GenerateArrayFrom("#18569E"),
        primary: Actions.GenerateArrayFrom("#FFFFFF"),
        secondary: Actions.GenerateArrayFrom("#686868"),
        weakDark: Actions.GenerateArrayFrom("#6A7A98"),
        linkDark: Actions.GenerateArrayFrom("#0B1F7C"),
        darkTitles: Actions.GenerateArrayFrom("#012000"),
        darkSecondaryText: Actions.GenerateArrayFrom("#C4C4C4")
    },
});
