import api from '@/lib/api';

export interface Branding {
  logo_url?: string;
  primary_color: string;
  secondary_color: string;
}

export interface DomainResolution {
  school_id: string;
  theme_id: string; // e.g. "default", "modern"
  branding: Branding;
  seo?: {
    title?: string;
    description?: string;
  };
}

/**
 * Resolves the domain to a specific school configuration.
 * In a real app, the backend handles this based on the 'Origin' or 'Host' header.
 * For now, we simulate a response.
 */
export const resolveDomain = async (
  domain: string
): Promise<DomainResolution> => {
  try {
    const response = await api.get('/public/front-side/resolve-domain', { params: { domain } });
    return response.data.data; // ResponseUtil.success wraps in { data: ... }
  } catch (error) {
    console.error("Domain resolution failed, falling back to default:", error);
    return {
      school_id: 'default', // Fallback ID
      theme_id: 'default',
      branding: {
        primary_color: 'oklch(0.6 0.15 250)',
        secondary_color: 'oklch(0.85 0.1 200)',
      },
      seo: {
        title: "School Portal",
        description: "Welcome to our school portal.",
      }
    };
  }
};

export const getPublicTheme = async () => {
  try {
    const response = await api.get('/public/front-side/theme');
    return response.data.data;
  } catch (error) {
    console.warn("Failed to get public theme:", error);
    return null;
  }
};

export const updatePublicTheme = async (themeId: string) => {
  try {
    const response = await api.put('/public/front-side/theme', { themeId });
    return response.data.data;
  } catch (error) {
    console.warn("Failed to update public theme:", error);
    return null;
  }
};
