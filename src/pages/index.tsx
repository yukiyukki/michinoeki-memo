import React from 'react';
import { InferGetStaticPropsType, NextPage } from 'next';
import { IndexPage } from '../components/Pages/IndexPage';
import { Client } from '../apiClients/prismicClient';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticProps = async () => {
  const doc = await Client().query('', {
    pageSize: 5,
    page: 1,
    orderings: '[document.last_publication_date desc]',
  });

  return {
    props: {
      doc,
    },
    revalidate: 1,
  };
};

const Index: NextPage<Props> = (props) => {
  const { doc } = props;
  return <IndexPage recentReports={doc} />;
};

export default Index;
