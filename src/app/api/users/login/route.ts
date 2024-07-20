import { connect } from '@/dbconfig/dbConfig';
import User from '@/model/userModel'
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';


connect();

export async function POST(req: NextRequest) {
    try {

        const reqBody = await req.json();
        const { email, password } = reqBody;
        console.log(reqBody);

        //check if user exists

        const user = await User.findOne({email});
        if (!user) {
            return NextResponse.json(
                {
                    error: 'User does not exist'
                },
                {
                    status: 400
                }
            )
        }

        const validPassword = await bcryptjs.compare(password, user.password);
        if (!validPassword) {
            return NextResponse.json(
                {
                    error: 'Invalid password'
                },
                {
                    status: 400
                }
            )
        }
        //create token data
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }
        //create token
        
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: '1d'});

        const res = NextResponse.json({
            message: 'Login successful',
            succeess: true,
        })
        res.cookies.set('token', token, {
            httpOnly: true,
        })
        return res;

        
    } catch (error: any) {
        console.log(error.message);
        return NextResponse.json(
            {
                error: error.message
            },
            {
                status: 500
            }
        )
        
    }
}