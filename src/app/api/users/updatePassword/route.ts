import { connect } from "@/dbConfig/dbConfig"
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server"
import bcryptjs from "bcryptjs"

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { token, password, confirmPassword } = reqBody;
        console.log(token);

        const user = await User.findOne({
            forgotPasswordToken: token,
            forgotPasswordTokenExpiry: {$gt: Date.now()}
        })

        if (!user) {
            return NextResponse.json({error: "Invalid Token"}, {status: 400})
        }

        user.forgotPasswordToken = undefined;
        user.forgotPasswordTokenExpiry = undefined;

         //hash Password
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash
        (password, salt)
        
        user.password = hashedPassword;
        await user.save();

        return NextResponse.json({
            message: "Password updated successfully",
            success: true,
        })

    } catch (error:any) {
        return NextResponse.json({error:error.message}, {status:500})
    }
}