import { Client, Account, Databases, Storage, Functions } from "appwrite";

const client = new Client()
  .setEndpoint("https://fra.cloud.appwrite.io/v1")
  .setProject("69244b2a0021eef00161");

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const functions = new Functions(client);

//Database
export const CUSTOMER_INFO_DB = "customerInfo";

//Tables
export const customerData = "customerdata";
