import fs from "fs";
import path from "path";

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
  return new Promise<boolean>((resolve, reject) => {
    try {
      if(!file || !name) return resolve(false)
      if (!isSafePictureName(name)) return resolve(false)
      const path = `${process.cwd()}/src/pictures/${owner}/`;

      const pathArr = path.split("/");
      let strPath = ``;
      for (let index = 1; index < pathArr.length - 1; index++) {
        const pathStr = pathArr[index];

        strPath += `/${pathStr}`;

        if (!fs.existsSync(strPath)) {
          fs.mkdirSync(strPath);
        }
      }

      const base64Data = file.replace(/^data:image\/\w+;base64,/, "");

      const writePath = `${path}${name}`;
      fs.writeFile(writePath, base64Data, "base64", function (err) {
        if (err) {
          return resolve(false);
        }
        return resolve(true);
      });
    } catch (error) {
      return reject(false);
    }
  });
}

export async function pictureDelete(name: string | null, owner: string) {
  return new Promise<boolean>((resolve, reject) => {
    if (!name || !isSafePictureName(name)) return resolve(false)
    const path = `${process.cwd()}/src/pictures/${owner}/${name}`;
    fs.access(path, fs.constants.F_OK, async (err) => {
      if (err) {
        return resolve(false);
      }
      await fs.unlinkSync(path);
      return resolve(true);
    });
  });
}

function isSafePictureName(name: string): boolean {
  return path.basename(name) === name && /^[A-Za-z0-9][A-Za-z0-9._-]*$/.test(name)
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
