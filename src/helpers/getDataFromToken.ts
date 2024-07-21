import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function getDataFromToken(req: NextRequest) {
    try {
        const token = req.cookies.get('token')?.value || '';
        const data = jwt.verify(token, process.env.TOKEN_SECRET!);
        return data;
    } catch (error: any) {
        throw new Error(error);
    }
}