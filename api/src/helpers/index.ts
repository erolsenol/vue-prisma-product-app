import fs from "fs";
import path from "path";

const MAX_PICTURE_BYTES = 5 * 1024 * 1024;

export function getPaginationObj(page: number, limit: number, count: number) {
  const normalizedLimit = Math.max(1, Number(limit));

  return {
    page: Number(page),
    limit: normalizedLimit,
    count,
    totalPage: Math.ceil(count / normalizedLimit),
  };
}

export async function pictureSave(
  file: string,
  name: string,
  owner: string
): Promise<boolean> {
  if (!isValidPictureData(file) || !isSafePictureName(name)) return false;

  try {
    const directory = path.join(process.cwd(), "src", "pictures", owner);
    await fs.promises.mkdir(directory, { recursive: true });
    const base64Data = file.slice(file.indexOf(",") + 1);
    await fs.promises.writeFile(path.join(directory, name), base64Data, "base64");
    return true;
  } catch {
    return false;
  }
}

export async function pictureDelete(name: string | null, owner: string): Promise<boolean> {
  if (!name || !isSafePictureName(name)) return false;

  try {
    await fs.promises.unlink(path.join(process.cwd(), "src", "pictures", owner, name));
    return true;
  } catch {
    return false;
  }
}

export function isValidPictureData(file: string): boolean {
  if (!file || !file.startsWith("data:image/")) return false;

  const match = /^data:image\/(gif|jpeg|jpg|png|webp);base64,([A-Za-z0-9+/]+={0,2})$/.exec(file);
  if (!match) return false;

  return Buffer.byteLength(match[2], "base64") <= MAX_PICTURE_BYTES;
}

function isSafePictureName(name: string): boolean {
  return path.basename(name) === name && /^[A-Za-z0-9][A-Za-z0-9._-]*$/.test(name);
}

export async function fileToBase64(
  filePath: string,
  name: string
): Promise<string> {
  try {
    const contents = await fs.promises.readFile(filePath, { encoding: "base64" });
    return `data:${pictureMimeType(name)};base64,${contents}`;
  } catch {
    return "";
  }
}

function pictureMimeType(name: string): string {
  const extension = path.extname(name).toLowerCase();
  const mimeTypes: Record<string, string> = {
    ".gif": "image/gif",
    ".jpeg": "image/jpeg",
    ".jpg": "image/jpeg",
    ".png": "image/png",
    ".webp": "image/webp",
  };

  return mimeTypes[extension] ?? "application/octet-stream";
}
