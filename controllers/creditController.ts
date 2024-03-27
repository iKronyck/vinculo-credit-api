import { Request, Response } from 'express';
import { CreditModel, ICredit } from '../models/CreditModel';

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

  public async createCredit(req: Request, res: Response): Promise<void> {
    try {
      const newCredit: ICredit = await CreditModel.create(req.body);
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
