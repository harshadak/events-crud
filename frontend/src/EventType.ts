export type Event = {
  id: number;
  title: string;
  description?: string;
  type?: string
  location: string;
  date: Date;
};