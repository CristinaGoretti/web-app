import { User } from "./user";

export class Issue {
  id?:string;
  createdAt: Date;
  description: string;
  imageUrl: string;
  additionalImageUrls: string[];
  issueTypeHref: string;
  location: {
	  coordinates:number[],
	  type: string
  };
  tags:string[];
  creator: User;

}