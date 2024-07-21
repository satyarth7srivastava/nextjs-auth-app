import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import  User  from "@/model/userModel";
import { connect } from "@/dbconfig/dbConfig";
connect();

export async function GET(req: NextRequest){
    try {
        const data: any = await getDataFromToken(req);
        const id = await data.id;
        const user = await User.findById(id).select('-password');
        return NextResponse.json({
            status: 200,
            data: user
        });
    } catch (error: any) {
        return NextResponse.json({
            status: 500,
            body: error.message
        });
        
    }
}

