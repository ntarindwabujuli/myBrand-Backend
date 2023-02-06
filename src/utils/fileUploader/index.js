import * as fs from 'fs';
import { join, extname } from 'path';
import dotenv from 'dotenv'
dotenv.config();
/**
 * Confirm user account
 * @param {object} file file
 * @param query
 */

// eslint-disable-next-line consistent-return
export const fileUploader = (file,query = 'media') => {
  try {
    const folder = 'contents';
    const dir = join(
      process.env.ROOT_DIR || process.cwd(),
      `/assets/uploads`,
    );
    const ext = extname(file.name);
    const itemName = `${query}-${Math.round(Math.random() * 1e9)}${ext}`;
    let filepath = `${dir}/${itemName}`;
    let itemLocation = `${process.env.HOST}/uploads/${itemName}`;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    file.mv(`${filepath}`, (err) => {
      if (err) {
        itemLocation = null;
        filepath = null;
      }
    });
    return { itemLocation, filepath };
  } catch (error) {
    console.log(error)
    return null;
  }
};
