import { Helmet } from 'react-helmet-async';

interface ArticleSchema {
  type: 'article';
  headline: string;
  description: string;
  image?: string;
  author?: string;
  datePublished?: string;
  dateModified?: string;
}

interface OrganizationSchema {
  type: 'organization';
  name?: string;
  logo?: string;
  url?: string;
  description?: string;
  sameAs?: string[];
}

interface WebsiteSchema {
  type: 'website';
  name?: string;
  url?: string;
  description?: string;
}

type SchemaData = ArticleSchema | OrganizationSchema | WebsiteSchema;

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
  noindex?: boolean;
  schema?: SchemaData;
}

export default function SEO({
  title,
  description,
  keywords,
  canonicalUrl,
  ogImage = '/og-image.png',
  ogType = 'website',
  twitterCard = 'summary_large_image',
  noindex = false,
  schema,
}: SEOProps) {
  const siteName = 'Pyrax';
  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;
  const siteUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const canonical = canonicalUrl || currentUrl;
  const fullOgImage = ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`;

  // Build JSON-LD schema
  let jsonLd = null;
  if (schema) {
    if (schema.type === 'article') {
      jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: schema.headline,
        description: schema.description,
        image: schema.image || fullOgImage,
        author: {
          '@type': 'Person',
          name: schema.author || 'Pyrax Editorial',
        },
        publisher: {
          '@type': 'Organization',
          name: siteName,
          logo: {
            '@type': 'ImageObject',
            url: `${siteUrl}/logo.png`,
          },
        },
        datePublished: schema.datePublished,
        dateModified: schema.dateModified || schema.datePublished,
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': canonical,
        },
      };
    } else if (schema.type === 'organization') {
      jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: schema.name || siteName,
        url: schema.url || siteUrl,
        logo: schema.logo || `${siteUrl}/logo.png`,
        description: schema.description || description,
        sameAs: schema.sameAs || [],
      };
    } else if (schema.type === 'website') {
      jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: schema.name || siteName,
        url: schema.url || siteUrl,
        description: schema.description || description,
        potentialAction: {
          '@type': 'SearchAction',
          target: `${siteUrl}/search?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      };
    }
  }

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonical} />
      
      {/* Robots */}
      {noindex && <meta name="robots" content="noindex,nofollow" />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:site_name" content={siteName} />
      
      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:url" content={canonical} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullOgImage} />
      
      {/* JSON-LD Schema */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
}
