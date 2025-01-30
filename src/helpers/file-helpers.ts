import path from "path";
import fs from "fs";
// import { getBoolean, isNullOrWhitespace } from "./type-helpers";

const fsPromises = fs.promises;

/**
 * Writes a file to disk
 * @param req Request object
 * @param options File write options
 * @returns The url of the written file
 */
export const writeFile = async (req: any, options?: WriteFileOptions) => {
  let fileUrl = "";

  if (!req.files || req.files?.length < 1) {
    return options?.defaultUrl ?? fileUrl;
  }

  let file = req.files[0];
  if (options?.key) {
    file = req.files.find((e: any) => e.fieldname == options.key);
  }

  if (!file) {
    return options?.defaultUrl ?? fileUrl;
  }

  let paths: any[] = [];

  if (options?.dirPath?.constructor === Array) {
    paths.push(...options?.dirPath);
  } else if (options?.dirPath?.constructor === String) {
    paths.push(options?.dirPath);
  }

  const dirPath = path.join("files", ...paths);
  const rootPath = path.join(path.resolve("./"), "public", dirPath);
  let fileName: string;
  if (options?.useOriginalFileName) {
    fileName = file.originalname;
  } else if (options?.fileName) {
    fileName = options.fileName + path.extname(file.originalname);
  } else {
    fileName =
      file.fieldname + "_" + Date.now() + path.extname(file.originalname);
  }

  if (!fs.existsSync(rootPath)) {
    fs.mkdirSync(rootPath, { recursive: true });
  }

  await fsPromises.writeFile(path.join(rootPath, fileName), file.buffer);

  fileUrl = new URL(path.join(dirPath, fileName), process.env.HOST ?? "").href;
  return fileUrl;
};

/**
 * Write multiple files to disk
 * @param req Request object
 * @param options File write options
 * @returns The urls of the written files
 */
export const writeMultipleFiles = async (
  req: any,
  options?: WriteFileOptions
) => {
  let fileUrls: any[] = [];

  if (req.files?.length < 1) {
    const url = options?.defaultUrl ?? "";
    fileUrls.push(url);
    return fileUrls;
  }

  // const files = req.files;

  for (let i = 0; i < req.files.length; i++) {
    const file = req.files[i];

    let paths: any[] = [];

    if (options?.dirPath?.constructor === Array) {
      paths.push(...options?.dirPath);
    } else if (options?.dirPath?.constructor === String) {
      paths.push(options?.dirPath);
    }

    const dirPath = path.join("files", ...paths);
    const rootPath = path.join(path.resolve("./"), "public", dirPath);
    const fileName =
      (options?.fileName ?? file.fieldname) +
      i +
      "_" +
      Date.now() +
      path.extname(file.originalname);

    if (!fs.existsSync(rootPath)) {
      fs.mkdirSync(rootPath, { recursive: true });
    }

    await fsPromises.writeFile(path.join(rootPath, fileName), file.buffer);

    const fileUrl = new URL(
      path.join(dirPath, fileName),
      process.env.HOST ?? ""
    ).href;

    fileUrls.push(fileUrl);
  }

  return fileUrls;
};

interface WriteFileOptions {
  fileName?: string;
  dirPath?: string | string[];
  defaultUrl?: string;
  key?: string;
  useOriginalFileName?: boolean;
}
