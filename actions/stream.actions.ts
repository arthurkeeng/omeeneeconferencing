"use server";

import { currentUser } from "@clerk/nextjs/server";
import { StreamChat } from 'stream-chat';


const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const apiSecret = process.env.STREAM_SECRET_KEY;

export const tokenProvider = async () => {

  console.log('this page was reached');
  
  const user = await currentUser();
  if (!user) throw new Error("user not logged in");
  if (!apiKey) throw new Error("No api key");
  if (!apiSecret) throw new Error("No api secret key");
  
  const serverClient = StreamChat.getInstance(apiKey, apiSecret);

  const exp = Math.round(new Date().getTime() / 1000) + 60 * 60;
  const issued = Math.floor(Date.now() / 1000) - 60;
  const token = serverClient.createToken(user?.id);

  return token
 
};
