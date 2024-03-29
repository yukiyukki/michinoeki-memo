import React from 'react';
import {
  Container,
  Typography,
  CircularProgress,
  Link,
  Grid,
} from '@mui/material';
import NextLink from 'next/link';
import styled from 'styled-components';
import Image from 'next/image';
import Head from 'next/head';
import ApiSearchResponse from 'prismic-javascript/types/ApiSearchResponse';
import { ApiReportList } from '../../ApiReportList';

interface Props {
  recentReports: ApiSearchResponse;
}

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

const IndexPage: React.FC<Props> = ({ recentReports }) => {
  if (recentReports.results_size === 0) {
    return (
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ height: '100vh' }}
      >
        <CircularProgress />
      </Grid>
    );
  }

  const reports = recentReports.results;

  return (
    <>
      <Head>
        <title>soriの道の駅メモ</title>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@sori_ja" />
        <meta name="twitter:creator" content="@sori_ja" />
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
            <ApiReportList reports={reports} />
          </Grid>
          <Grid item md={4}>
            <Image
              src="https://images.prismic.io/michinoeki/383af5fd-91a8-485b-95f9-65c087a1f866_sub_prefs.png?auto=compress,format"
              width={300}
              height={45}
              alt="地域で探す"
            />
            <Grid container justifyContent="flex-start">
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
                '富山県',
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
