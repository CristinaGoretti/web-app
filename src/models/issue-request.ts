export class IssueRequest {
    createdAt: Date;
    description: string;
    imageUrl: string;
    additionalImageUrls: [
      string
    ];
    issueTypeHref: string;
    location: {
      coordinates: number[];
      type: string;
    };
    tags: string[];
  }