import React from 'react';
import {
  Container,
  Divider,
  Typography,
  CircularProgress,
  Link,
} from '@material-ui/core';
import NextLink from 'next/link';
import { useEffect, useState } from 'react';
import { styled } from '@material-ui/core/styles';
import apiClient from '../../../apiClients/apiClient';
import gql from 'graphql-tag';
import { ApolloQueryResult } from 'apollo-client';
import { getRecentReports } from './__generated__/getRecentReports';
import { ReportList } from '../../ReportList';

const HeadTypography = styled(Typography)({
  marginTop: '80px',
});

const DescTypography = styled(Typography)({
  marginTop: '40px',
  marginBottom: '40px',
});

const ListLinkTypography = styled(Typography)({
  marginTop: '20px',
});

const Subtitle = styled(Typography)({
  marginTop: '40px',
  marginBottom: '20px',
});

const Footer = styled(Container)({
  width: '100%',
  maxWidth: '100%',
  height: '45px',
  position: 'fixed',
  bottom: '0',
  backgroundColor: '#fff',
  borderTop: '1px solid #ccc',
  padding: '10px',
});

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
    return <CircularProgress />;
  }

  return (
    <>
      <Container maxWidth="sm">
        <HeadTypography variant="h2" align="center">
          soriの道の駅メモ
        </HeadTypography>
        <DescTypography>
          このspaceはsoriが行った道の駅の記録をつけておく場所です。
          <br />
          マイペースに書いていきます。
        </DescTypography>
        <Divider />
        <Subtitle variant="h4">最近の道の駅レポート</Subtitle>
        <ReportList reports={reports.allReports.edges} />

        <ListLinkTypography variant="body1" align="right">
          <NextLink href="/reports">
            <Link>レポート一覧へ</Link>
          </NextLink>
        </ListLinkTypography>
      </Container>
      <Footer fixed>
        <Typography align="center">
          <NextLink href="https://lanieve.jp/">
            <Link>lanieve.jp</Link>
          </NextLink>
        </Typography>
      </Footer>
    </>
  );
};

export { IndexPage };
