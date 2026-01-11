import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, image, url }) => {
  const siteTitle = "FitBite - Premium Dry Fruits & Healthy Snacks";
  const defaultDesc = "Buy best quality almonds, cashews, walnuts and healthy snacks online. Fresh, premium, and healthy dry fruits delivered to your doorstep.";
  const siteUrl = "https://fitbite.com"; // Jab live karoge tab ye change karlena
  const defaultImage = "https://your-logo-url.com/logo.png"; // Koi default image (Logo) ka link

  return (
    <Helmet>
      {/* 1. Standard Metadata */}
      <title>{title ? `${title} | FitBite` : siteTitle}</title>
      <meta name="description" content={description || defaultDesc} />

      {/* 2. Facebook / WhatsApp (Open Graph) */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title ? `${title} | FitBite` : siteTitle} />
      <meta property="og:description" content={description || defaultDesc} />
      {image && <meta property="og:image" content={image} />}
      <meta property="og:url" content={url ? `${siteUrl}${url}` : siteUrl} />

      {/* 3. Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title ? `${title} | FitBite` : siteTitle} />
      <meta name="twitter:description" content={description || defaultDesc} />
      {image && <meta name="twitter:image" content={image} />}
    </Helmet>
  );
};

export default SEO;