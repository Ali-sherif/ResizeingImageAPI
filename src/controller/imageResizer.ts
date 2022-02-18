import { Request, Response } from 'express';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

export const myResizeFunc = async (
  fileName: string,
  image: Buffer,
  width: number,
  height: number
): Promise<Error | null> => {
  try {
    await sharp(image)
      .resize(width, height)
      .toFile(`./assets/thumb/thumb_${fileName}`);
  } catch (err) {
    return err as Error;
  }
  return null;
};

export const imageResizer = async (
  req: Request,
  res: Response
): Promise<void> => {
  const extention = '.jpg';
  const fileName: string = `${req.query.filename}${extention}` as string;
  const width: number = parseInt(req.query.width as unknown as string);
  const height: number = parseInt(req.query.height as unknown as string);

  if (!fileName) {
    res.status(400).send('Please enter valid value for filename');
    return;
  }
  if (!width || width < 0) {
    res.status(400).send('Please enter valid value for width');
    return;
  }
  if (!height || height < 0) {
    res.status(400).send('Please enter valid value for height');
    return;
  }

  const dirname: string = (path.dirname(path.dirname(__dirname)) +
    `/assets/thumb/thumb_${fileName}`) as string;
  const isExist: boolean = fs.existsSync(dirname);

  if (isExist) {
    res.append('isModified', 'true');
    res.status(304).sendFile(`thumb_${fileName}`, { root: './assets/thumb' });
  } else {
    fs.readFile(
      `./assets/full/${fileName}`,
      async (err: Error | null, image: Buffer): Promise<void> => {
        if (err) {
          res.status(404).send('there is problem with reading image');
          return;
        }
        res.append('isCreated', 'true');
        await myResizeFunc(fileName, image, width, height);
        res.status(201).sendFile(`thumb_${fileName}`, {
          root: path.dirname(path.dirname(__dirname)) + '/assets/thumb',
        });
      }
    );
  }
};
