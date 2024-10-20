import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface CustomRequest extends Request {
  email?: string;
  id?: number;
}

export const verifyToken = (req: CustomRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  
  if (token == null) {
    console.log('token not found')
    res.sendStatus(401);
    return;
  }

  jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
    if (err) {
      console.log(err)
      res.sendStatus(403);
      return;
    }
    req.email = (decoded as JwtPayload).email;
    req.id = (decoded as JwtPayload).id;
    next();
  });
};
