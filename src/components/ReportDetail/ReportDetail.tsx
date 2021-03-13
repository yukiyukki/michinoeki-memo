import * as React from 'react';
import { useEffect, useState, createRef } from 'react';
import { useRouter } from 'next/router';
import {
  Divider,
  Typography,
  CircularProgress,
  Link,
  Grid,
} from '@material-ui/core';
import NextLink from 'next/link';
import styled from 'styled-components';
import apiClient from '../../apiClients/apiClient';
import gql from 'graphql-tag';
import { ApolloQueryResult } from 'apollo-client';
import {
  getReportArticleVariables,
  getReportArticle,
  getReportArticle_allReports_edges_node_description_website__ExternalLink,
} from './__generated__/getReportArticle';
import { RichText, Elements } from 'prismic-reactjs';
import { theme } from '../../styles/theme';
import Image from 'next/image';

const MainContainer = styled(Grid)`
  padding: 0 12px;
  @media screen and (min-width: 768px) {
    padding: 0 40px;
  }
`;

const HeadTypography = styled(Typography)`
  margin-top: 20px;
  font-size: 36px;
  font-weight: bold;
  color: #323ab1;
`;

const PrefTypography = styled(Typography)`
  margin-left: 2px;
  font-size: 24px;
`;

const SubHeadTypography = styled(Typography)`
  margin-top: 20px;
  font-size: 24px;
  font-weight: bold;
`;

const LinkTypography = styled(Typography)`
  margin-top: 20px;
  font-size: 16px;
  color: ${theme.palette.primary.dark};
  text-decoration: underline;
  cursor: pointer;
`;

const BreadCrumb = styled(Typography)`
  margin-top: 20px;
  font-size: 14px;
  color: ${theme.palette.primary.dark};
  text-decoration: underline;
  cursor: pointer;
`;

const BreadCrumbCurrent = styled(Typography)`
  margin-top: 20px;
  font-size: 14px;
  color: ${theme.palette.primary.dark};
`;

const MainContents = styled(Grid)``;

const MainRichText = styled(RichText)``;

const MainTypography = styled(Typography)`
  font-size: 14px;
  margin: 10px 0;
`;

const ContentsImageArea = styled(Grid)`
  position: relative;
`;

const DescTable = styled(Grid)`
  margin-top: 10px;
  font-size: 14px;
`;

const DescTr = styled(Grid)`
  border-top: 1px solid #ccc;
  word-wrap: break-word;
`;

const DescTd = styled(Grid)`
  padding: 4px 2px;
`;

const htmlSerializer = (
  type: React.ElementType,
  element: any,
  _content: string,
  children: React.ReactNode[],
  _key: string,
) => {
  switch (type) {
    case Elements.image:
      return (
        <ContentsImageArea>
          <Image src={element.url} alt={element.alt} width={640} height={480} />
        </ContentsImageArea>
      );

    case Elements.paragraph:
      return <MainTypography>{children}</MainTypography>;
    default:
      return null;
  }
};

const ReportDetail: React.FC = () => {
  const router = useRouter();
  const descHeader = createRef<HTMLElement>();

  const fetchReportArticle = async (
    uid: string,
  ): Promise<ApolloQueryResult<getReportArticle>> => {
    const variables: getReportArticleVariables = {
      uid,
    };

    return await apiClient.query({
      query: gql`
        query getReportArticle($uid: String!) {
          allReports(uid: $uid) {
            edges {
              node {
                place_name
                cover_picture
                contents
                description {
                  website {
                    __typename
                    ... on _ExternalLink {
                      url
                    }
                  }
                  ticket_image
                  prefecture
                  city
                  address
                  access
                  open_time
                  close_time
                  facilities
                  activities
                  restroom
                  memorial_ticket
                  other
                }
              }
            }
          }
        }
      `,
      variables,
    });
  };

  const [article, setArticle] = useState<getReportArticle>(null);

  useEffect(() => {
    if (!router.query.slug) {
      return;
    }
    (async () => {
      const result = await fetchReportArticle(String(router.query.slug));
      setArticle(result.data);
    })();
  }, [router.query]);

  if (article === null || article.allReports.edges.length === 0) {
    return (
      <Grid
        container
        justify="center"
        alignItems="center"
        style={{ height: '100vh' }}
      >
        <CircularProgress />
      </Grid>
    );
  }

  const report = article.allReports.edges[0].node;
  const desc = report.description[0];
  const website = desc.website as getReportArticle_allReports_edges_node_description_website__ExternalLink;

  const rows = [
    {
      title: '公式サイト',
      content: (
        <Link href={website.url} target="_blank" rel="noopener">
          {website.url}
        </Link>
      ),
    },
    {
      title: '住所',
      content: `${desc.prefecture}${desc.city}${desc.address}`,
    },
    {
      title: '交通',
      content: desc.access,
    },
    {
      title: '営業時間',
      content: `${desc.open_time}〜${desc.close_time}`,
    },
    {
      title: '施設等',
      content: desc.facilities,
    },
    {
      title: 'アクティビティ',
      content: desc.activities,
    },
    {
      title: 'トイレ',
      content: desc.restroom,
    },
    {
      title: '記念きっぷ',
      content: (
        <>
          {desc.memorial_ticket}
          {desc.ticket_image && desc.ticket_image.url && (
            <>
              <br />
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '200px',
                  marginTop: '10px',
                }}
              >
                <Image
                  src={desc.ticket_image.url}
                  layout="fill"
                  objectFit="contain"
                  objectPosition="left"
                />
              </div>
            </>
          )}
        </>
      ),
    },
    {
      title: 'その他',
      content: desc.other,
    },
  ];

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    descHeader.current.scrollIntoView();
  };

  return (
    <Grid>
      {report.cover_picture && report.cover_picture.url && (
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '240px',
          }}
        >
          <Image
            src={report.cover_picture.url}
            alt={report.cover_picture.alt}
            objectFit="cover"
            layout="fill"
          />
        </div>
      )}
      <MainContainer>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="baseline"
        >
          <BreadCrumb variant="body1">
            <NextLink href="/">
              <Link>トップページ&nbsp;&gt;</Link>
            </NextLink>
          </BreadCrumb>
          <BreadCrumb variant="body1" style={{ marginLeft: '10px' }}>
            <NextLink href="/reports">
              <Link>道の駅レポート&nbsp;&gt;</Link>
            </NextLink>
          </BreadCrumb>
          <BreadCrumbCurrent variant="body1" style={{ marginLeft: '10px' }}>
            {report.place_name[0].text}
          </BreadCrumbCurrent>
        </Grid>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="baseline"
        >
          <HeadTypography variant="h3" align="left">
            {report.place_name[0].text}
          </HeadTypography>
          <PrefTypography>
            （{report.description[0].prefecture}）
          </PrefTypography>
        </Grid>
        <LinkTypography variant="caption" onClick={handleClick}>
          道の駅の概要を見る &gt;&gt;
        </LinkTypography>
        <MainContents>
          <MainRichText
            render={report.contents}
            htmlSerializer={htmlSerializer}
          />
        </MainContents>
        <SubHeadTypography variant="h5" innerRef={descHeader}>
          - 概要 -
        </SubHeadTypography>
        <DescTable>
          {rows.map((row, index) => (
            <DescTr
              key={index}
              container
              direction="row"
              justify="flex-start"
              alignItems="center"
            >
              <DescTd xs={2}>{row.title}</DescTd>
              <DescTd xs={9}>{row.content}</DescTd>
            </DescTr>
          ))}
        </DescTable>

        <Divider />

        <LinkTypography variant="body1">
          <NextLink href="/reports">
            <Link>一覧へ戻る</Link>
          </NextLink>
        </LinkTypography>
        <LinkTypography variant="body1">
          <NextLink href="/">
            <Link>トップページ</Link>
          </NextLink>
        </LinkTypography>
      </MainContainer>
    </Grid>
  );
};

export { ReportDetail };
