import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>DNPL | Technical Test</title>
        <meta
          name="description"
          content="Say goodbye to debt and hello to financial freedom with Dnpl – the all-in-one debt management solution."
        />
      </Head>
      <div className="h-screen w-full bg-gray-900">
        <h1 className="text-white">Homepage</h1>
      </div>
    </>
  );
}
