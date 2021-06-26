export type User = {
  id: number;
  name: string;
};

export interface IArticle {
  title: string;
  badge?: [string];
}

export interface ILinksProps {
  slugs: string[];
}

export interface IFileMatter {
  files: string[];
}

interface IFile {
  name: string;
  matterData: any;
}

export interface IArticlesProps {
  files: IFile[];
  heading: string;
  excludedTags?: string[];
}

export interface IHomeProps {
  files: IFile[];
}

export interface IPath {
  params: {
    tag: string;
  };
}

export interface IMenuItem {
  isLast?: boolean;
  to: string;
  [x: string]: any;
}
