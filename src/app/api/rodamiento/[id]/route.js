
import { NextResponse } from "next/server";
import {connectDB} from '@/libs/mongoose';
import Rodamientos from '@/models/rodamiento';

export async function GET(request,{params}){
    try {
        await connectDB();
        const id = params.id;
        const rodamientos= await Rodamientos.findById(id);

        if(!rodamientos){
            return NextResponse({
                mensaje:"Rodamiento no encontrado"
            },{status:400})
        }

        return NextResponse.json({
            rodamientos
        })
    } catch (error) {
        console.log(error)
        return NextResponse(error.mensaje,{status:400})
    }
}


export async function DELETE(request,{params}){
    try {
        await connectDB();
        const id = params.id;
        const rodamientos= await Rodamientos.deleteOne({'_id':id});
        
        if(!rodamientos){
            return NextResponse({
                mensaje:"Rodamiento no encontrado"
            },{status:400})
        }

        return NextResponse.json({
            rodamientos
        })
    } catch (error) {
        console.log(error)
        return NextResponse(error.mensaje,{status:400})
    }
}



export async function PUT(request,{params}){
    try {
        await connectDB();
        const data = await request.json();
        const id = params.id; 
        const rodamientoUpdated=await Rodamientos.findByIdAndUpdate(id,data,{new:true});
        
        if(!rodamientoUpdated){
            return NextResponse({

                mensaje:"Rodamiento no encontrado"
            },{status:400})
        }

        return NextResponse.json({
            rodamientoUpdated 
        })
    } catch (error) {
        console.log(error)
        return NextResponse(error.mensaje,{status:400})
    }
}