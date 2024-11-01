import { ACTIONS_CORS_HEADERS, ActionsJson } from "@solana/actions";

export const GET = async () => {
  const payload: ActionsJson = {
    rules: [
      {
        pathPattern: "/transferSol",
        apiPath: "/api/actions/transferSol",
      },
      //   {
      //     pathPattern: "/create",
      //     apiPath: "/api/actions/create",
      //   },
    ],
  };

  return Response.json(payload, {
    headers: ACTIONS_CORS_HEADERS,
  });
};

export const OPTIONS = GET;
