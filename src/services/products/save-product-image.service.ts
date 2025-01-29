import { writeFile } from "@helpers/file-helper";
import { Request } from "express";

export const saveImage = (req: Request) => {
  const imageUrl = writeFile(req, {
    dirPath: ["products"],
    fileName: `product_${Date.now()}`,
  });

  return imageUrl;
};
