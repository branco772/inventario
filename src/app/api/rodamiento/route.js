import { NextResponse } from "next/server";
import {connectDB} from '@/libs/mongoose';
import Rodamientos from '@/models/rodamiento';


export async function GET(){
    try {
        await connectDB();
        const rodamientos= await Rodamientos.find();
        return NextResponse.json({
            rodamientos
        })
    } catch (error) {
        console.log(error)
        return NextResponse(error.mensaje,{status:400})
    }
}

export async function POST(request){
    try {
        await connectDB();
        const data = await request.json();
        const newRodamiento = new Rodamientos(data); 
        const respuesta = await newRodamiento.save();
        return NextResponse.json({
            respuesta
        })
    } catch (error) {
        console.log(error)
        return NextResponse(error.mensaje,{status:400})
    }
}