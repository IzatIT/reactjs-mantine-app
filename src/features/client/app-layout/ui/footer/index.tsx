"use client";
import {Box, Divider, Flex, Image, Text, Title} from "@mantine/core";
import {COLORS, SOCIAL_LINKS} from "src/constants";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";

export function Footer() {
    const {t, i18n} = useTranslation();
  return (
    <footer>
      <Box  w="100vw" bg={COLORS.TRIOTERY_COLOR}>
          <Box py={{base: 32, sm: 40}}>
              <Flex
                  direction={{base: "column", xs: "row"}}
                  className="container" gap={24} mb={40} align={{base: "start", xs: "center"}} justify="space-between">
                <Box>
                    <Title fz={24} fw={600} c={COLORS.PRIMARY_COLOR}>
                      Vent Fix
                    </Title>
                  <Text fz={16} fw={500} style={{whiteSpace: "pre-line"}} c={COLORS.PRIMARY_COLOR}>
                      {t("section.titles.materials")}
                  </Text>
                </Box>
                <Flex gap={24} c={COLORS.PRIMARY_COLOR}>
                    {SOCIAL_LINKS.map((link) => (
                        <Link key={link.link} to={link.link} target="_blank">
                            <Image width={32} height={32} src={link.iconWhite} alt=""/>
                        </Link>
                    ))}
                </Flex>
              </Flex>
              <Divider color="gray"/>
              <Flex direction="column" align="center" c="#FAFAFA" fz={18} fw={400} mt={24} className="container" justify="center">
                © Copyright Shipcrea 2024
                  <Link to={`/${i18n.language  || "ru"}/login`}>
                      <Text c="gray">
                          {t("button.login")}
                      </Text>
                  </Link>
              </Flex>
          </Box>
      </Box>
    </footer>
  );
}
