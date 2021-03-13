import React from 'react';
import {
  Container,
  Typography,
  CircularProgress,
  Link,
  Grid,
} from '@material-ui/core';
import NextLink from 'next/link';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import apiClient from '../../../apiClients/apiClient';
import gql from 'graphql-tag';
import { ApolloQueryResult } from 'apollo-client';
import { getRecentReports } from './__generated__/getRecentReports';
import { ReportList } from '../../ReportList';
import Image from 'next/image';
import Head from 'next/head';

const DescTypography = styled(Typography)`
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 14px;
`;

const ListLinkTypography = styled(Typography)`
  margin-top: 20px;
`;

const Footer = styled(Container)`
  width: 100%;
  max-width: 100%;
  height: 45px;
  position: fixed;
  bottom: 0;
  background-color: #fff;
  border-top: 1px solid #ccc;
  padding: 10px;
`;
const LinkSpan = styled(Link)`
  margin-right: 10px;
`;

const IndexPage: React.FC = () => {
  const fetchRecentReports = async (): Promise<
    ApolloQueryResult<getRecentReports>
  > => {
    return await apiClient.query({
      query: gql`
        query getRecentReports {
          allReports(sortBy: meta_lastPublicationDate_DESC, first: 5) {
            edges {
              node {
                place_name
                description {
                  prefecture
                  city
                }
                _meta {
                  uid
                  lastPublicationDate
                }
              }
            }
          }
        }
      `,
    });
  };

  const [reports, setReports] = useState<getRecentReports>(null);

  useEffect(() => {
    (async () => {
      const result = await fetchRecentReports();
      setReports(result.data);
    })();
  }, []);

  if (reports === null || reports.allReports.edges.length === 0) {
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

  return (
    <>
      <Head>
        <meta property="og:title" content={`soriの道の駅メモ`} />
        <meta
          property="og:image"
          content="https://images.prismic.io/michinoeki/cb23068a-d0fb-427b-b8b8-d634278c81e2_michinoeki-title.png?auto=compress,format"
        />
      </Head>
      <Container maxWidth="md" style={{ paddingBottom: '120px' }}>
        <Image
          src="https://images.prismic.io/michinoeki/cb23068a-d0fb-427b-b8b8-d634278c81e2_michinoeki-title.png?auto=compress,format"
          width={1024}
          height={370}
          alt="soriの道の駅メモ"
        />
        <DescTypography>
          このspaceはsoriが行った道の駅の記録をつけておく場所です。
          <br />
          マイペースに書いていきます。
        </DescTypography>
        <Grid container>
          <Grid item md={8} style={{ paddingRight: '20px' }}>
            <Image
              src="https://images.prismic.io/michinoeki/01ffda02-bdbe-41a5-b688-aa079cba3fcd_sub_recent.png?auto=compress,format"
              width={300}
              height={45}
              alt="最近のレポート"
            />
            <ReportList reports={reports.allReports.edges} />
          </Grid>
          <Grid item md={4}>
            <Image
              src="https://images.prismic.io/michinoeki/383af5fd-91a8-485b-95f9-65c087a1f866_sub_prefs.png?auto=compress,format"
              width={300}
              height={45}
              alt="地域で探す"
            />
            <Grid container justify="flex-start">
              {[
                '山形県',
                '福島県',
                '茨城県',
                '栃木県',
                '群馬県',
                '埼玉県',
                '千葉県',
                '神奈川県',
                '新潟県',
                '山梨県',
                '長野県',
                '岐阜県',
                '静岡県',
                '佐賀県',
                '長崎県',
                '宮崎県',
                '鹿児島県',
                '沖縄県',
              ].map((pref, idx) => (
                <Grid style={{ marginRight: '4px' }} key={idx}>
                  <NextLink href={`/reports/prefs/${pref}`}>
                    <LinkSpan>{pref}</LinkSpan>
                  </NextLink>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
        <ListLinkTypography
          variant="body1"
          align="left"
          style={{ cursor: 'pointer' }}
        >
          <NextLink href="/reports">
            <Image
              src="https://images.prismic.io/michinoeki/06c78fb5-ba42-497b-9cd7-7e946b3f1b8b_sub_report.png?auto=compress,format"
              width={300}
              height={45}
              alt="すべてのレポート"
            />
          </NextLink>
        </ListLinkTypography>
      </Container>
      <Footer fixed>
        <Typography align="center">
          <Link href="https://lanieve.jp/">lanieve.jp</Link>
        </Typography>
      </Footer>
    </>
  );
};

export { IndexPage };
