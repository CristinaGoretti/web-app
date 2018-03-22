export class IssueRequest {
    assigneeHref: null;
    createdAt: Date;
    updatedAt: Date;
    creatorHref: string;
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
    state: "new";
  }