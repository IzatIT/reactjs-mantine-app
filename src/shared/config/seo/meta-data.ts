
type GenerateMetaDataType = (title: string, description?: string, link?: string) => any;

export const generateMetaData: GenerateMetaDataType = (title, description, link) => {
    const slicedTitle = title.slice(0, 50);
    const slicedDesc = description?.slice(0, 150);
    if (description) {
        return {
            title: slicedTitle,
            description: slicedDesc,

            twitter: {
                card: "summary_large_image",
                images: "/logo.png",
                description: slicedDesc,
                title: slicedTitle
            },
            openGraph: {
                url: link,
                type: "website",
                title: slicedTitle,
                description: slicedDesc,
                images: "/logo.png"
            },
            icons: "/logo.png",
            keywords: "Категории вент фикс строительные материалы",
            alternates: {
                canonical: link,
                languages: {
                    ru: `/ru/${link}`,
                    kg: `/kg/${link}`,
                },
            }
        };
    } else {
        return {
            title: slicedTitle,
            icons: "/logo.png",
        }
    }

};