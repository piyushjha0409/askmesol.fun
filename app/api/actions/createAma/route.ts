// import {
//   Transaction,
//   PublicKey,
//   SystemProgram,
//   Connection,
//   clusterApiUrl,
//   LAMPORTS_PER_SOL,
// } from "@solana/web3.js";
import { useSession } from "next-auth/react";
import { NextResponse } from "next/server";
import {
//   createPostResponse,
//   ActionGetResponse,
//   ActionPostResponse,
  ActionPostRequest
} from "@solana/actions";
// import { prisma } from "@/prisma";

// const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
// const yourProgramId = new PublicKey('ProgramId here')


//TODO: run a query for the checking 

// export async function GET(request: Request) {

//     //url decode   
//     const {pathname} = new URL(request.url);
//     const pathSegments = pathname.split("/")
//     const user_id = pathSegments[4]

//     //find query for any existential data in the database 
//     // const OrgData = await prisma

//   const response: ActionGetResponse = {
//     icon: "https://hive.io/",
//     title: "Ask Me Anything!",
//     description: "This is Ask me anything blink",
//     label: "Click me!",
//     error: {
//       message: "This blink is not implemented yet!",
//     },
//   };

//   return Response.json(response);
// }

//This is post req

export async function POST(request: Request) {
  const {status} =  useSession()
  
  if(status === 'unauthenticated'){
    return NextResponse.json(
        {success: false, message: "User not authenticated"},
        {status: 401}
    );
  }
 
//   let user_id; 
//   try{
//     const user = await prisma.user.findUnique({ 
//        where: {userId}
//      });

//   }
  const payload: ActionPostRequest = await request.json();  
  const userPubKey = payload.account;
  console.log("This is the user public key", userPubKey);
  
  const response  = {
      message: `Hello ${userPubKey}`,
      transaction: "",
  };

  return Response.json(response);
}
