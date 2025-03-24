import client from "@/app/lib/appwrite_client";
import { Databases, ID, Query } from "appwrite";
import { NextResponse } from "next/server";
const database = new Databases(client);

console.log("Database ID:", process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID);

//create interpretion 
async function createInterpretation(data: {term: string, interperation : string}) {
try{
const response = await database.createDocument( 
   
process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
 'interpertion',
  ID.unique(),
   data);
console.log("response", response);
return response;

}
catch (error){
console.error("the error is", error);
throw new Error("Failed to create interpretation");
}
}
//fetch interpretion 
async function fetchInterpretations() {
   try{
   const response = await database.listDocuments(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string, 
      'interpertion', 
      [Query.orderDesc('$createdAt')]);
   return response.documents;
   
   }
   catch (error){
   console.error("the error is", error);
   throw new Error("Failed to fetch interpretation");
   }
   }

export async function POST(req: Request) {
   try{

      const{term, interperation} = await req.json();
      const data = {term, interperation};
      console.log(data);

      const response = await createInterpretation(data);
      console.log(response);
      return NextResponse.json({message: "Interpretation created successfully" });
   }
   catch(error){
      console.log("the error is", error);
      return NextResponse.json({message: "Failed to create interpretation"}, {status: 500});
   }
}
export async function GET() {
   try{
      const response = await fetchInterpretations();
      return NextResponse.json(response);
   }
   catch(error){
      return NextResponse.json({message: "Failed to fetch interpretation"}, {status: 500});
   }
}