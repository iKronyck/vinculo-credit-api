import { NextFunction, Request, Response } from 'express';
import multer from 'multer';
import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';
import { CreditModel, ICredit } from '../models/CreditModel';
import AppError from '../utils/AppError';

const multerStorage = multer.memoryStorage();

const multerFilter = (_req: Request, file: any, cb: any) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

export class CreditController {
  public async getAllCredits(_req: Request, res: Response): Promise<void> {
    try {
      const credits: ICredit[] = await CreditModel.find({});
      res.status(200).json({
        status: 'success',
        results: credits.length,
        data: {
          credits,
        },
      });
    } catch (error) {
      res.status(500).json({
        status: 'fail',
        message: error.message,
      });
    }
  }

  public uploadDocumentPhoto = upload.single('document');

  public resizePhoto = async (req: Request, _res: Response, next: NextFunction) => {
    if (!req.file) return next();
    req.file.filename = `document-${uuidv4()}-${Date.now()}.jpeg`;

    await sharp(req.file.buffer).resize(500, 500).toFormat('jpeg').jpeg({ quality: 90 }).toFile(`public/img/users/${req.file.filename}`);

    next();
  };

  public async createCredit(req: Request, res: Response): Promise<void> {
    try {
      const body = req.body;
      if (req.file) body.document = `images/${req.file.filename}`;
      const newCredit: ICredit = await CreditModel.create(body);
      res.status(201).json({
        status: 'success',
        data: {
          credit: newCredit,
        },
      });
    } catch (error) {
      res.status(400).json({
        status: 'fail',
        message: error.message,
      });
    }
  }
}
