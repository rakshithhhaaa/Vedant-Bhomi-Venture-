import React, { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
}

export const SEO: React.FC<SEOProps> = ({
  title = 'Vedaanth ECO Buildcon (VEBCO) | Eco Friendly Construction Bangalore',
  description = 'Vedaanth ECO Buildcon (VEBCO) specializes in sustainable vernacular architecture, CSEB mud bricks, and interlocking soil compressed bricks in Bangalore. Save 60% cement & sand with fast-track eco construction.',
}) => {
  useEffect(() => {
    document.title = title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', description);
    }
  }, [title, description]);

  return null;
};
