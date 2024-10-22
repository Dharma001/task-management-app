import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface CustomRequest extends Request {
  email?: string;
  id?: number;
}

export const verifyToken = (req: CustomRequest, res: Response, next: NextFunction): any => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  
  if (!token) {
    console.log('Token not found');
    return res.sendStatus(401); 
  }

  jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.sendStatus(403);
    }

    req.email = (decoded as JwtPayload).email; 
    req.id = (decoded as JwtPayload).id;
    next();
  });
};

export const getUserInfo = (req: CustomRequest) => {
  return {
    userEmail: req.email,
    userId: req.id,
  };
};
