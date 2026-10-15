export type MomentKind = "text";

export type Moment = {
  number: number;
  slug: string;
  status: "published" | "draft";
  title: string;
  punchline: string;
  why: string;
  publishedOn: string;
  kind: MomentKind;
  sponsor?: boolean;
  source: {
    name: string;
    url: string;
  };
  topics: string[];
};

export type Batch = {
  id: string;
  publishedAt: string;
  kicker: string;
  note: string;
  moments: Moment[];
};
