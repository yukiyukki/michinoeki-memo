import * as React from 'react';
import { createRef } from 'react';
import {
  Divider,
  Typography,
  CircularProgress,
  Link,
  Grid,
} from '@mui/material';
import NextLink from 'next/link';
import styled from 'styled-components';
import { RichText, Elements } from 'prismic-reactjs';
import { theme } from '../../styles/theme';
import Image from 'next/image';
import Head from 'next/head';
import { Document } from 'prismic-javascript/types/documents';

interface Props {
  detail: Document | null;
}

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

const MainTypography = styled(Typography)`
  font-size: 14px;
  margin: 10px 0;
`;

const ContentsImageArea = styled(Grid)`
  position: relative;
  max-width: 100%;
  height: 24em;
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
  key: string,
) => {
  switch (type) {
    case Elements.image:
      return (
        <ContentsImageArea
          container
          justify="flex-start"
          alignItems="center"
          key={key}
        >
          <Image
            src={element.url}
            alt={element.alt}
            layout="fill"
            objectFit="contain"
            objectPosition="left"
          />
          {element.alt && (
            <Typography style={{ fontSize: '12px' }}>{element.alt}</Typography>
          )}
        </ContentsImageArea>
      );

    case Elements.paragraph:
      return <MainTypography key={key}>{children}</MainTypography>;
    default:
      return null;
  }
};

const ReportDetail: React.FC<Props> = ({ detail }) => {
  const descHeader = createRef<HTMLElement>();
  if (detail === null) {
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

  const report = detail.data;
  const desc = report.description[0];
  const website = desc.website;

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
      <Head>
        <title>{`soriの道の駅メモ - ${report.place_name[0].text}のレポート`}</title>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@sori_ja" />
        <meta name="twitter:creator" content="@sori_ja" />
        <meta
          property="og:title"
          content={`soriの道の駅メモ - ${report.place_name[0].text}のレポート`}
        />
        {report.cover_picture && (
          <meta property="og:image" content={report.cover_picture.url} />
        )}
      </Head>
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
          justifyContent="flex-start"
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
          justifyContent="flex-start"
          alignItems="baseline"
        >
          <HeadTypography variant="h3" align="left">
            {report.place_name[0].text}
          </HeadTypography>
          <PrefTypography>（{desc.prefecture}）</PrefTypography>
        </Grid>
        <LinkTypography variant="caption" onClick={handleClick}>
          道の駅の概要を見る &gt;&gt;
        </LinkTypography>
        <MainContents>
          <RichText render={report.contents} htmlSerializer={htmlSerializer} />
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
              <DescTd item xs={2}>
                {row.title}
              </DescTd>
              <DescTd item xs={9}>
                {row.content}
              </DescTd>
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
