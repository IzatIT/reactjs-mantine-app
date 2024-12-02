import {
    AppealDetailPage,
    AppealPage,
    CategoriesCreatePage,
    CategoriesDetailPage, CategoriesEditPage,
    CategoriesPage, HomePage,
    InfoBlockCreatePage,
    InfoBlockDetailPage, InfoBlockEditPage,
    InfoBlockPage,
    PartnersCreatePage,
    PartnersDetailPage, PartnersEditPage,
    PartnersPage, ProductsCreatePage, ProductsDetailPage, ProductsEditPage, ProductsPage, ProfilePage
} from "src/pages";
import {RouteData} from "src/types";
import {LoginPage} from "src/pages/admin/login/page";

export const routes: RouteData[] = [
    {
        path: "/login",
        element: <LoginPage />,
        isPublic: true,
    },
    {
        path: "/admin/appeals",
        element: <AppealPage />,
        isPublic: false,
    },
    {
        path: "/admin/appeals/:id",
        element: <AppealDetailPage />,
        isPublic: false,
    },

    {
        path: "/admin/categories",
        element: <CategoriesPage />,
        isPublic: false,
    },
    {
        path: "/admin/categories/:id",
        element: <CategoriesDetailPage />,
        isPublic: false,
    },
    {
        path: "/admin/categories/:id/edit",
        element: <CategoriesEditPage />,
        isPublic: false,
    },
    {
        path: "/admin/categories/create",
        element: <CategoriesCreatePage />,
        isPublic: false,
    },


    {
        path: "/admin/info_block",
        element: <InfoBlockPage />,
        isPublic: false,
    },
    {
        path: "/admin/info_block/:id",
        element: <InfoBlockDetailPage />,
        isPublic: false,
    },
    {
        path: "/admin/info_block/:id/edit",
        element: <InfoBlockEditPage />,
        isPublic: false,
    },
    {
        path: "/admin/info_block/create",
        element: <InfoBlockCreatePage />,
        isPublic: false,
    },

    {
        path: "/admin/partners",
        element: <PartnersPage />,
        isPublic: false,
    },
    {
        path: "/admin/partners/:id",
        element: <PartnersDetailPage />,
        isPublic: false,
    },
    {
        path: "/admin/partners/:id/edit",
        element: <PartnersEditPage />,
        isPublic: false,
    },
    {
        path: "/admin/partners/create",
        element: <PartnersCreatePage />,
        isPublic: false,
    },

    {
        path: "/admin/products",
        element: <ProductsPage />,
        isPublic: false,
    },
    {
        path: "/admin/products/:id",
        element: <ProductsDetailPage />,
        isPublic: false,
    },
    {
        path: "/admin/products/:id/edit",
        element: <ProductsEditPage />,
        isPublic: false,
    },
    {
        path: "/admin/products/create",
        element: <ProductsCreatePage />,
        isPublic: false,
    },


    {
        path: "/admin/profile",
        element: <ProfilePage />,
        isPublic: false,
    },

    {
        path: "/",
        element: <HomePage />,
        isPublic: true,
    },
]