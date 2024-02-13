import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import React from 'react';

import PageNextJs from 'nextjs/PageNextJs';

const Events = dynamic(() => import('ui/pages/Events'), { ssr: false });

const Page: NextPage = () => {
  return (
    <PageNextJs pathname="/events">
      <Events/>
    </PageNextJs>
  );
};

export default Page;

export { base as getServerSideProps } from 'nextjs/getServerSideProps';
