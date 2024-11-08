import React from "react";
import { Card, CardContent } from "@/components/ui/card";

type Props = {
  key: number;
};
const CardComponents = ({ key }: Props) => {
  return (
    <Card key={key} className="bg-black text-white h-[50vh] w-[35vh]">
      <CardContent className="py-4">
        <h2 className="text-xl font-bold mb-2">Card {key}</h2>
        <p className="text-gray-300">This is a placeholder for card content.</p>
      </CardContent>
    </Card>
  );
};

export default CardComponents;
