import {
  BlogAuthorStatus,
  BlogCategoryStatus,
  BlogContentFormat,
  BlogRedirectStatus,
  BlogRedirectType,
  BlogStatus,
  BlogTagStatus,
  BlogWebsiteStatus,
} from '../constants/blog.constants';

export interface IBlogSeo {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  focusKeyword?: string;
  robots?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImageMediaId?: string | any | null;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImageMediaId?: string | any | null;
  schemaType?: string;
}

export interface IBlogWebsiteSocialLinks {
  twitter?: string;
  facebook?: string;
  linkedin?: string;
  github?: string;
  instagram?: string;
  youtube?: string;
}

export interface IBlogWebsite {
  _id: string;
  name: string;
  slug: string;
  domain: string;
  baseUrl: string;
  description?: string;
  logoMediaId?: string | any;
  faviconMediaId?: string | any;
  defaultAuthorId?: string | any;
  defaultLanguage: string;
  defaultSeo?: IBlogSeo;
  socialLinks?: IBlogWebsiteSocialLinks;
  status: BlogWebsiteStatus;
  createdAt?: string;
  updatedAt?: string;
}

export interface IBlogCategory {
  _id: string;
  websiteId: string | IBlogWebsite;
  name: string;
  slug: string;
  description?: string;
  parentCategoryId?: string | IBlogCategory | null;
  featuredImageMediaId?: string | any;
  seo?: IBlogSeo;
  status: BlogCategoryStatus;
  createdAt?: string;
  updatedAt?: string;
}

export interface IBlogTag {
  _id: string;
  websiteId: string | IBlogWebsite;
  name: string;
  slug: string;
  description?: string;
  seo?: IBlogSeo;
  status: BlogTagStatus;
  createdAt?: string;
  updatedAt?: string;
}

export interface IBlogAuthor {
  _id: string;
  websiteId: string | IBlogWebsite;
  userId?: string | null;
  name: string;
  slug: string;
  designation?: string;
  biography?: string;
  profileImageMediaId?: string | any;
  socialLinks?: {
    website?: string;
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
  status: BlogAuthorStatus;
  createdAt?: string;
  updatedAt?: string;
}

export interface IBlog {
  _id: string;
  websiteId: string | IBlogWebsite;
  title: string;
  slug: string;
  excerpt: string;
  content: any;
  contentFormat: BlogContentFormat;
  contentRawText?: string;
  featuredImageMediaId?: {
    _id?: string;
    storageKey?: string;
    publicUrl?: string;
    originalFileName?: string;
    mimeType?: string;
    size?: number;
  } | string | null;
  featuredImageAlt?: string;
  categoryIds: (IBlogCategory | string)[];
  tagIds: (IBlogTag | string)[];
  authorId: IBlogAuthor | string;
  coAuthorIds?: (IBlogAuthor | string)[];
  status: BlogStatus;
  publishedAt?: string | null;
  scheduledAt?: string | null;
  allowComments: boolean;
  isFeatured: boolean;
  allowIndexing: boolean;
  readingTime: number;
  wordCount: number;
  seo?: IBlogSeo;
  createdAt?: string;
  updatedAt?: string;
}

export interface IBlogRevision {
  _id: string;
  websiteId: string;
  blogId: string;
  version: number;
  title: string;
  slug: string;
  excerpt: string;
  content: any;
  seo?: IBlogSeo;
  changeSummary?: string;
  createdBy?: {
    _id?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
  } | string;
  createdAt?: string;
}

export interface IBlogRedirect {
  _id: string;
  websiteId: string | IBlogWebsite;
  sourcePath: string;
  destinationPath: string;
  redirectType: BlogRedirectType;
  status: BlogRedirectStatus;
  createdAt?: string;
  updatedAt?: string;
}

export interface IBlogListFilter {
  websiteId?: string;
  search?: string;
  categoryId?: string;
  tagId?: string;
  authorId?: string;
  status?: BlogStatus | string;
  isFeatured?: boolean;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface IBlogCategoryFilter {
  websiteId?: string;
  search?: string;
  parentCategoryId?: string | null;
  status?: BlogCategoryStatus | string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface IBlogTagFilter {
  websiteId?: string;
  search?: string;
  status?: BlogTagStatus | string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface IBlogAuthorFilter {
  websiteId?: string;
  search?: string;
  status?: BlogAuthorStatus | string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface IBlogRedirectFilter {
  websiteId?: string;
  search?: string;
  status?: BlogRedirectStatus | string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

