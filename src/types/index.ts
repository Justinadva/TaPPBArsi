export interface Course {
  id: string;
  title: string;
  description: string;
  category: "Design" | "Structure" | "History";
  image_url: string;
}