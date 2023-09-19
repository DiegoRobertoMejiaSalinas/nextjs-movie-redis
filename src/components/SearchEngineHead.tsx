import { ISeoProps } from "@/interfaces/seoProps";
import Head from "next/head";

export const SearchEngineHead = ({
  canonicalUrl,
  description,
  ogImgUrl,
  ogType,
  title,
  ogTitle,
}: ISeoProps) => {
  return (
    <Head>
      <title>{title}</title>
      <meta property="og:title" content={ogTitle} key="title" />
      <meta property="og:url" content={canonicalUrl} key="url" />
      <meta
        property="og:description"
        content={description}
        key="og_description"
      />
      <meta name="description" content={description} key="description" />
      <meta property="og:locale" content="es_ES" />
      <meta name="color-scheme" content="light only" />
      <meta name="supported-color-schemes" content="light" />
      <meta property="og:image" content={ogImgUrl} key="imageUrl" />
      <meta property="og:type" content={ogType} key="type" />
    </Head>
  );
};
