import * as React from 'react';
import { useEffect, useState, createRef } from 'react';
import { useRouter } from 'next/router';
import {
  Divider,
  Typography,
  CircularProgress,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Link,
} from '@material-ui/core';
import NextLink from 'next/link';
import { styled } from '@material-ui/core/styles';
import apiClient from '../../apiClients/apiClient';
import gql from 'graphql-tag';
import { ApolloQueryResult } from 'apollo-client';
import {
  getReportArticleVariables,
  getReportArticle,
  getReportArticle_allReports_edges_node_description_website__ExternalLink,
} from './__generated__/getReportArticle';
import { RichText } from 'prismic-reactjs';
import { theme } from '../../styles/theme';
import Image from 'next/image';
import styles from './style.module.scss';

const HeadTypography = styled(Typography)({
  marginTop: '20px',
});

const LinkTypography = styled(HeadTypography)({
  color: theme.palette.primary.dark,
  textDecoration: 'underline',
  cursor: 'pointer',
});

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
    return <CircularProgress />;
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
                  width: '320px',
                  height: '200px',
                }}
              >
                <Image
                  src={desc.ticket_image.url}
                  layout="fill"
                  className={styles.objectFitContain}
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
    <>
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
          className={styles.objectFitCover}
          layout="fill"
        />
      </div>
      <HeadTypography variant="h3" align="left">
        {report.place_name[0].text}
      </HeadTypography>
      <LinkTypography variant="caption" onClick={handleClick}>
        概要を見る
      </LinkTypography>
      <RichText render={report.contents} />
      <HeadTypography variant="h5" innerRef={descHeader}>
        概要
      </HeadTypography>
      <Table>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.title}</TableCell>
              <TableCell>{row.content}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Divider />

      <HeadTypography variant="body1">
        <NextLink href="/reports">
          <Link>一覧へ戻る</Link>
        </NextLink>
      </HeadTypography>
      <HeadTypography variant="body1">
        <NextLink href="/">
          <Link>トップページ</Link>
        </NextLink>
      </HeadTypography>
    </>
  );
};

export { ReportDetail };
