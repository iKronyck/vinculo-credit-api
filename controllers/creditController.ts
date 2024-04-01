import { NextFunction, Request, Response } from 'express';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { CreditModel, ICredit } from '../models/CreditModel';
import AppError from '../utils/AppError';
import { S3Service } from '../services/S3Service';

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
    if (req.file && req.body.selfie) {
      const uuid = uuidv4();
      const now = Date.now();

      const documentName = `document-${uuid}-${now}.jpeg`;
      const selfieName = documentName.replace('document', 'selfie');
      const selfieBuffer = Buffer.from(req.body.selfie.split(',')[1], 'base64');

      const s3Services = new S3Service();
      await s3Services.uploadFile(documentName, req.file.buffer);
      await s3Services.uploadFile(selfieName, selfieBuffer);

      req.body.document = await s3Services.getFileURL(documentName);
      req.body.selfie = await s3Services.getFileURL(selfieName);
    }
    next();
  };

  public async createCredit(req: Request, res: Response): Promise<void> {
    try {
      const body = req.body;

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

  public async getCreditByID(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const credit = await CreditModel.findById(id);
      res.status(200).json({
        status: 'success',
        data: {
          credit,
        },
      });
    } catch (error) {
      res.status(404).json({
        status: 'fail',
        message: 'El usuario no fue encontrado',
      });
    }
  }
}
