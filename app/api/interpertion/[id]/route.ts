import client from "@/app/lib/appwrite_client";
import { Databases, ID, Query } from "appwrite";
import { NextResponse } from "next/server";

const database = new Databases(client);

//Fetch Specific interpretation

async function fetchInterpretation(id: string) {
    try {
        const interpertion = await database.getDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
            "interpertion",
            id
        );
        return interpertion;
    } catch (error) {
        console.error("the error is", error);
        throw new Error("Failed to fetch interpretation");
    }
}

//Delete Specific interpretation
async function deleteInterpretation(id: string) {
    try {
        const interpertion = await database.deleteDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
            "interpertion",
            id
        );
        return interpertion;
    } catch (error) {
        console.error("the error is", error);
        throw new Error("Failed to delete interpretation");
    }
}

//Update Specific interpretation
async function updateInterpretation(id: string, data: {term: string, interperation : string}) {
    try {
        const interpertion = await database.updateDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
            "interpertion",
            id,
            data
        );
        return interpertion;
    } catch (error) {
        console.error("the error is", error);
        throw new Error("Failed to update interpretation");
    }
}

export async function GET(
    req: Request,
    {params}: {params: {id: string}}
) {
    try{
        const id = params.id;
        const interpertion =  await fetchInterpretation(id);
        return  NextResponse.json(interpertion);

    }
    catch(error){ 
        return NextResponse.json({message: "Failed to fetch interpretation"}, {status: 500});  

    }
}

export async function DELETE(
    req: Request,
    {params}: {params: {id: string}}
) {
    try{
        const id = params.id;
        const interpertion =  await deleteInterpretation(id);
        return  NextResponse.json({ message: "Interpretation deleted successfully"});

    }
    catch(error){ 
        return NextResponse.json({message: "Failed to delete interpretation"}, {status: 500});  

    }

}


export async function PUT(
    req: Request,
    {params}: {params: {id: string}}
) {
    try{
        const id = params.id;
        const response =  await req.json();
        await updateInterpretation(id, response);
        return  NextResponse.json({ message: "Interpretation updated successfully"});

    }
    catch(error){ 
        return NextResponse.json({message: "Failed to update interpretation"}, {status: 500});  

    }

}