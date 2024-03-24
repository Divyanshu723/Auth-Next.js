import { connect } from "@/dbConfig/dbConfig"
import { sendEmail } from "@/helpers/mailer"
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server"


connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const email = reqBody.useremail;

        const user = await User.findOne({ email });

        if (user) {
             //send verification email
            await sendEmail({ email, emailType: "RESET", userId: user._id })
            
            return NextResponse.json({
            message: "Reset Password link sent successfully",
            success: true,
             })
        } else {
            return NextResponse.json({error: "User not registered"}, {status: 400})
        }
    } catch (error:any) {
         return NextResponse.json({error: error.message}, {status: 500})
    }
}