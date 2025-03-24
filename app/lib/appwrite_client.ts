import { Client } from "appwrite";
import { env } from "process";

const client = new Client()
    .setProject(process.env.NEXT_PROJECT_APPWRITE_PROJECT_ID as string);


export default client;
