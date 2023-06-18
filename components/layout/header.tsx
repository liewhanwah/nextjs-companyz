import Head from "next/head";

function HeaderCpn({ title }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="og:title" content={title} />
        <meta
          name="description"
          content="Do it yourself for the best insurance coverage."
        />
      </Head>
    </>
  );
}

export default HeaderCpn;
