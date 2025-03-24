import { Client } from "appwrite";
import { env } from "process";

const client = new Client()
    .setProject(process.env.NEXT_PROJECT_APPWRITE_PROJECT_ID as string)
    .setEndpoint(env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string);

export default client;
