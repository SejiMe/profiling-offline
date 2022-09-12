import Head from 'next/head';
import { useRouter } from 'next/router';

export default function Seo(props) {
  const router = useRouter();
  const meta = {
    title: 'pwu-profiling',
    site_name: 'pwu-profiling',
    description: 'pwu-profiling description',
    url: '...',
    image: '...',
    type: 'website',
    robots: 'follow, index',
    ...props,
  };

  meta['title'] = props.templateTitle
    ? `${props.templateTitle} | ${meta.site_name}`
    : meta.title;

  return (
    <Head>
      <title>{meta.title}</title>
      <meta name='robots' content={meta.robots} />
      <meta content={meta.description} name='description' />
      <meta property='og:url' content={`${meta.url}${router.asPath}`} />
      <link rel='canonical' href={`${meta.url}${router.asPath}`} />
      {/* Open Graph */}
      <meta property='og:type' content={meta.type} />
      <meta property='og:site_name' content={meta.site_name} />
      <meta property='og:description' content={meta.description} />
      <meta property='og:title' content={meta.title} />
      <meta name='image' property='og:image' content={meta.image} />
    </Head>
  );
}
