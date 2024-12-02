"use client"
import {
    Accordion,
    Box,
    Flex, Text, Title,
} from "@mantine/core";
import React from "react";
import {Categories} from "src/entities/categories";
import {COLORS} from "src/constants";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";
import {Content} from "src/shared/helpers/content";
import {ChangeLanguage} from "src/shared/ui/change-language";

interface Props {
  pages?: Categories[];
  onClose: () => void;
}

export const BurgerMenu = ({ pages }: Props) => {
  const {i18n} = useTranslation();
  const locale = i18n.language

    const pagesComponent = pages?.map((page) => {
        if(page.children?.length){
            return (
                <Accordion key={page.id} w="100%">
                    <Accordion.Item value={`${page.id}`}>
                       <Accordion.Control >
                          <Title fz={16} fw={500} c={COLORS.TRIOTERY_COLOR}>
                              {Content.GetTitleByLanguage(page, locale)}
                          </Title>
                       </Accordion.Control>
                        <Accordion.Panel px={0}>
                            <Flex direction="column" gap={24}>
                                {page?.children?.map((child) => (
                                    <Box fz={16} fw={400} c={COLORS.TRIOTERY_COLOR} key={child.id}>
                                        <Link to={`/${locale}/category/${child.id}`}>
                                           <Text c="#0C0D13">
                                               {Content.GetTitleByLanguage(child, locale)}
                                           </Text>
                                        </Link>
                                    </Box>
                                ))}
                            </Flex>
                        </Accordion.Panel>
                    </Accordion.Item>
                </Accordion>
            )
        }else if(!page.parentId?.id){
            return (
                <Flex style={{borderBottom: "1px solid var(--mantine-color-gray-3)"}} py={10} px={18} w="100%" key={page.id}>
                   <Link to={`/${locale}/category/${page.id}`}>
                          <Title fz={16} fw={500} c={COLORS.TRIOTERY_COLOR}>
                              {Content.GetTitleByLanguage(page, locale)}
                          </Title>
                   </Link>
                </Flex>
            )
        }
    })


  return (
    <Box h="100vh">
      <Flex direction="column" gap={12} my={"16px"} px={15} align="center">
          <ChangeLanguage />
          {pagesComponent}
      </Flex>
    </Box>
  );
};
