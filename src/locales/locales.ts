import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import { kg, ru } from "./index";

i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            kg: { translation: kg },
            ru: { translation: ru },
        },
        lng: "ru",
        fallbackLng: "ru",
        supportedLngs: ["kg", "ru"],
        detection: {
            order: [
                "querystring",
                "cookie",
                "htmlTag",
                "path",
            ],
            // Где сохранять язык
            caches: ["cookie", "localStorage"],
        },
        interpolation: {
            escapeValue: false, // React автоматически экранирует
        },
        // Игнорировать не поддерживаемые языки
        nonExplicitSupportedLngs: true,
    });

export default i18n;
