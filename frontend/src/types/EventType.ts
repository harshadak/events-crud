export type EventType = {
  id: number;
  title: string;
  description?: string;
  type?: string
  location: string;
  date: Date;
};

export type FormData = {
  title: string,
  description: string,
  type: string,
  location: string
}