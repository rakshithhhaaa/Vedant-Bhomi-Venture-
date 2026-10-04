import React, { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
}

export const SEO: React.FC<SEOProps> = ({
  title = 'Vedant Bhomi Venture | Eco Friendly Construction (VEBCO)',
  description = 'Vedant Bhomi Venture (VEBCO) specializes in sustainable vernacular architecture, CSEB mud bricks, and interlocking soil compressed bricks across Karnataka, Tamil Nadu, and Andhra Pradesh. Saves about 60% of cement and sand with fast-track eco construction.',
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
