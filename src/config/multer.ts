import path from "path";
import multer, { FileFilterCallback } from "multer";
import { Request } from "express";

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

// Multer config
const imageUpload = multer({
  storage: multer.diskStorage({
    // destination: (req:Request, file:Express.Multer.File, cb:DestinationCallback) => {
    //   cb(null, "./assets/images/");
    //   // cb(null, path.resolve(__dirname, "./..", "assets/images")); // same as above
    // },
    filename: (
      req: Request,
      file: Express.Multer.File,
      cb: FileNameCallback
    ) => {
      // console.log(file);
      cb(null, Date.now() + "" + file.originalname);
    },
  }),
  fileFilter: (
    req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback
  ): void => {
    let ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      cb(null, false);
      return;
    }
    cb(null, true);
  },
});

export { imageUpload };
