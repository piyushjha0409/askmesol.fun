import { ACTIONS_CORS_HEADERS, ActionGetResponse } from "@solana/actions";

export const GET = async () => {
  const payload: ActionGetResponse = {
    icon: `https://pixabay.com/images/search/random/`,
    title: "Piyush Bhaiii ke age koi bol sakta hai kya",
    description: "Enter the secret to share with others and get paid",
    label: "Create One",
    links: {
      actions: [
        {
          label: "Create One",
          href: `/api/actions/create?secret={secret}&image={image}&price={price}`,
          parameters: [
            {
              type: "text",
              name: "secret",
              label: "Enter Secret",
              required: true,
            },
            {
              type: "url",
              name: "image",
              label: "Enter Image URL",
              required: true,
            },
            {
              type: "number",
              name: "price",
              label: "Enter Price in SEND",
              required: true,
            },
          ],
          type: "transaction",
        },
      ],
    },
    type: "action",
  };

  return new Response(JSON.stringify(payload), {
    headers: ACTIONS_CORS_HEADERS,
  });
};

export const OPTIONS = GET;
