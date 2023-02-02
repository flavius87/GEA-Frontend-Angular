export interface Icollection {
  url:string;
  title:string;
  style:string;
  name:string;
  location?:string;
  city:string;
  year:number;
  description:string;
  src:Src[];
  video?:Video[];
}

interface Src {
  src:string;
  srcset:string;
  alt:string;
  title?:string;
}

interface Video {
  videoUrl:string;
  title?:string;
}
