import fs from "fs";

export function getPaginationObj(page: number, limit: number, count: number) {
  return {
    page: Number(page),
    limit: Number(limit),
    count,
    totalPage: Math.ceil(count / limit),
  };
}

export async function pictureSave(
  file: string,
  name: string,
  owner: string
): Promise<boolean> {
  return new Promise<boolean>((resolve, reject) => {
    try {
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

export async function fileToBase64(
  path: string,
  name: string
): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    try {
      const contents = fs.readFileSync(path, { encoding: "base64" });
      const dotIndex = name.indexOf(".");
      
      return resolve(`data:image/jpeg;base64,${contents}`);
    } catch (error) {
      return resolve("");
    }
  });
}
