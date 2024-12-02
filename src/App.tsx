import React, { createContext, useContext, useEffect, useMemo } from "react";
import { RouteData } from "src/types";
import {Navigate, Route, Routes, useLocation} from "react-router-dom";
import { routes } from "src/routes";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";

const LocalizationContext = createContext({ locale: "ru", setLocale: (lang: string) => {} });

const LocalizationProvider = ({ children }: { children: React.ReactNode }) => {
    const { i18n } = useTranslation();
    const locale = i18n.language;
    const setLocale = (lang: string) => {
        i18n.changeLanguage(lang);
    };

    return (
        <LocalizationContext.Provider value={{ locale, setLocale }}>
            {children}
        </LocalizationContext.Provider>
    );
};

const useLocalization = () => useContext(LocalizationContext);

const renderRoutes = (route: RouteData, isAuthenticated: boolean) => {
    if (route.isPublic || isAuthenticated) {
        return (
            <Route
                key={route.path}
                path={`/:locale/${route.path}`}
                element={route.element}
            />
        );
    }
    return null;
};

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};


function App() {
    const { locale, setLocale } = useLocalization();
    const accessToken = Cookies.get("access_token");
    const isAuthenticated = !!accessToken;
    const {pathname} = useLocation()
    const localizedRoutes = useMemo(
        () =>
            routes.map((route) =>
                renderRoutes(route, isAuthenticated)
            ),
        [isAuthenticated]
    );

    useEffect(() => {
        setLocale("ru");
    }, [setLocale]);
    return (
        <LocalizationProvider>
            <React.Suspense fallback={<div>Loading...</div>}>
                <ScrollToTop/>
                <Routes>
                    <Route path="/" element={<Navigate to={locale} replace />} />
                    <Route path="/:locale" >
                        {localizedRoutes}
                    </Route>
                </Routes>
            </React.Suspense>
        </LocalizationProvider>
    );
}

export default App;
