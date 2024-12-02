import { AdminPageList } from "src/entities/app-shell";
import { getAccessiblePages } from "../helpers";
import { Box, Flex, Tooltip } from "@mantine/core";
import styles from "./styles.module.scss";
import { useMediaQuery } from "@mantine/hooks";
import { Text } from "@mantine/core";
import {useTranslation} from "react-i18next";
import {Link, useLocation} from "react-router-dom";
import {Content} from "src/shared/helpers/content";

type Props = {
    opened: boolean;
}

export const AppShellNavbarFeature = ({ opened }: Props) => {
    const pageList: AdminPageList[] = getAccessiblePages()
    const {i18n} = useTranslation();
    const locale = i18n.language
    const {pathname} = useLocation()
    const smallScreen = useMediaQuery("(max-width: 768px)")


    if (!pageList)
        return null
    return (
        <Flex mt={10}
            align="center"
            justify="center"
            direction={{ base: "row", sm: "column" }}>
            {pageList?.map((el) => {
                const title = Content.GetTitleByLanguage(el.title, locale)
                return (
                    <Flex
                        className={styles.page_list_item}
                        justify={opened && !smallScreen ? "start" : "center"}
                        component={Link}
                        data-active={pathname.includes(el.link)}
                        to={`/${locale}/${el.link}`} key={el.link}
                    >
                        {opened || smallScreen ?
                            <Box fz={30}>
                                {el.icon}
                            </Box> :
                            <Tooltip
                                transitionProps={{ transition: 'slide-up', duration: 200 }}
                                color="violet" label={title}>
                                <Box fz={30}>
                                    {el.icon}
                                </Box>
                            </Tooltip>}
                        {opened && !smallScreen &&
                            <Text fz={18} fw="500" >
                                {title}
                            </Text>}
                    </Flex>
                )
            })}
        </Flex>
    )

}
