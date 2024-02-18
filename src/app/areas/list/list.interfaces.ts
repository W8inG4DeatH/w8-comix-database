export interface IComixItem {
  id?: number;
  comixTitle: string;
  seriesTitle?: string | null;
  seriesSubtitle?: string | null;
  displayName?: string | null;
  author?: string | null;
  publisher?: string | null;
  publishmentYear?: number | null;
  numberOfPages?: number | null;
  coverUrlLink?: string | null;
  coverHard?: boolean | null;
  rating?: number | null;
  collected?: boolean | null;
  userId: number;
}
