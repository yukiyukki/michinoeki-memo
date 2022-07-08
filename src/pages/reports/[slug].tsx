import * as React from 'react';
import { InferGetStaticPropsType, NextPage } from 'next';
import { ReportDetail } from '../../components/ReportDetail';
import { Container } from '@mui/material';
import { Client } from '../../apiClients/prismicClient';
import { useRouter } from 'next/router';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticProps = async ({ params }) => {
  const doc = await Client().getByUID('report', params.slug, {});

  return {
    props: {
      doc,
    },
    revalidate: 1,
  };
};

export const getStaticPaths = async () => {
  const doc = await Client().query('', {
    pageSize: 30,
    page: 1,
    orderings: '[document.last_publication_date desc]',
  });

  const paths = doc.results.map((result) => ({
    params: {
      slug: result.uid,
    },
  }));

  return {
    paths,
    fallback: true,
  };
};

const ReportIndex: NextPage<Props> = (props) => {
  const router = useRouter();
  const { doc } = props;

  return (
    <Container maxWidth={false} style={{ padding: 0 }}>
      <ReportDetail detail={router.isFallback ? null : doc} />
    </Container>
  );
};

export default ReportIndex;
