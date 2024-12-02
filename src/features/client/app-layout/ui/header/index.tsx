"use client";
import {
    Box,
    Burger,
    Center,
    Flex, Grid, Paper,
    Popover, Title, UnstyledButton,
} from "@mantine/core";
import {useClickOutside, useDisclosure} from "@mantine/hooks";
import { BurgerMenu } from "./burder-menu";
import {COLORS} from "src/constants";
import {IconChevronDown} from "@tabler/icons-react";
import {Categories, searchCategories} from "src/entities/categories";
import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {Link, useLocation} from "react-router-dom";
import {ChangeLanguage} from "src/shared/ui/change-language";
import {Content} from "src/shared/helpers/content";

export function Header() {
  const {t, i18n} = useTranslation();
  const locale = i18n.language;
  const [opened, { toggle, close }] = useDisclosure();
    const {pathname} = useLocation()
    const [categories, setCategories] = useState<Categories[]>();
    const pagesComponent = categories?.map(page => <MenuItem page={page} key={page.id} />)

    const fetchCategories = async () => {
      const res = await searchCategories({
          sorting: {sortBy: "ID", sortDirection: "DESC"},
          pageRequest: {page: 0, limit: 10},
          filter: {}
      },false)
        setCategories(res?.content)
    }


    const logoSection = (
       <Link to="/">
           <img src="/logo.png" alt="" width={120} height={70} style={{objectFit: "contain"}}/>
       </Link>
    )
    const pagesSection = (
            <Paper display={{base: "none", md: "block"}} px={100} pt={16}>
                <Flex gap={24} align="center" wrap={"wrap"} justify="center">
                    {pagesComponent}
                </Flex>
            </Paper>
    )
    const langaugeSection = (
        <Flex gap={12} style={{ borderRadius: "10px" }}>
            <Link to={`/${locale}/contacts`}>
                <UnstyledButton
                    bg={COLORS.PRIMARY_BG} style={{ borderRadius: "100px"}}
                    p={14} fz={14} c={COLORS.PRIMARY_COLOR}>
                    {t("button.contacts")}
                </UnstyledButton>
            </Link>
            <Box display={{base: "none", sm: "block"}}>
                <ChangeLanguage />
            </Box>
        </Flex>
    )

    const burgerSection = (
        <Box display={{ base: "block", xl: "none" }}>
            <Popover
                onChange={toggle}
                width={300}
                opened={opened}
                trapFocus
                position="bottom"
                shadow="md"
            >
                <Popover.Target>
                    <Center
                        style={{
                            borderRadius: "10px",
                            backgroundColor: COLORS.PRIMARY_BG,
                            height: "44px",
                            width: "44px",
                        }}
                    >
                        <Burger
                            color={COLORS.PRIMARY_COLOR}
                            onClick={toggle}
                            opened={opened}
                        />
                    </Center>
                </Popover.Target>
                <Popover.Dropdown
                    display={{ base: "block", xl: "none" }}
                    pos="absolute"
                    style={{
                        borderRadius: "0",
                        border: "none",
                        maxWidth: "576px",
                        width: "100%",
                    }}
                    bg="white"
                >
                    <BurgerMenu
                        onClose={toggle}
                        pages={categories}
                    />
                </Popover.Dropdown>
            </Popover>
        </Box>
    )
    useEffect(() => {
        fetchCategories()
    }, []);
    useEffect(() => {
        close()
    }, [pathname]);
  return (
    <header>
        <Box py={{base: 16, sm: 24}} style={{borderBottom: "1px solid #585F6D3D", backgroundColor: "white"}}>
        <Grid p={0} className="container" justify="space-between" align="center">
            <Grid.Col  span={{base: 1,sm: 2, md: 0.2}}>
                <Flex justify="start">
                    <Box display={{base: "none", md: "block"}}>
                        {logoSection}
                    </Box>
                    <Box display={{base: "block", md: "none"}}>
                        {langaugeSection}
                    </Box>
                </Flex>
            </Grid.Col>
            <Grid.Col  span={{base: 3,sm: 3, md: 11}}>
               <Flex justify="center">
                   <Box display={{base: "block", md: "none"}}>
                       {logoSection}
                   </Box>
               </Flex>
            </Grid.Col>
            <Grid.Col span={0.3}>
                <Flex gap={{ base: 12, lg: 16 }}  justify="end" align="center">
                   <Box display={{base: "none", md: "block"}}>
                       {langaugeSection}
                   </Box>
                    {burgerSection}
                </Flex>
            </Grid.Col>
        </Grid>
            {pagesSection}
        </Box>
    </header>
  );
}



const MenuItem = ({page}: {page: Categories}) => {
    const [opened, {toggle, close, open}] = useDisclosure()
    const ref = useClickOutside(() => close());
    const {i18n} = useTranslation();
    const locale = i18n.language
    const pageTitle = Content.GetTitleByLanguage(page, locale)

    return (
        <div ref={ref}>
            {page.children?.length ?
                <Popover opened={opened} onClose={close} onOpen={open}
                          key={page.id}>
                    <Popover.Target>
                        <UnstyledButton onClick={toggle} fz={16} fw={500} c={COLORS.TRIOTERY_COLOR}>
                            <Flex gap={10} fw={500} align="center">
                                {pageTitle}
                                <IconChevronDown size="1rem"
                                                 style={{
                                                     transition: "300ms",
                                                     transform: opened ? "rotate(-180deg)" : "rotate(0)",
                                                 }}
                                                 color={COLORS.PRIMARY_BG} stroke={2} />
                            </Flex>
                        </UnstyledButton>
                    </Popover.Target>
                    <Popover.Dropdown style={{marginTop: "5px", padding: "16px 32px", border: "none", backgroundColor: COLORS.PRIMARY_BG}}>
                        <Flex direction="column" gap={14}>
                            {page?.children?.map((child) => (
                                <Link key={child.id} to={`/${locale}/category/${child.id}`}>
                                    <Box fz={16} fw={500} c={COLORS.PRIMARY_COLOR}>
                                        {Content.GetTitleByLanguage(child,locale)}
                                    </Box>
                                </Link>
                            ))}
                        </Flex>
                    </Popover.Dropdown>
                </Popover>
                     : !page?.parentId?.id &&
                    <Link to={`/${locale}/category/${page.id}`}>
                        <Box  fz={16} fw={500} c={COLORS.TRIOTERY_COLOR}>
                            {pageTitle}
                        </Box>
                    </Link>
            }
        </div>
    )
}