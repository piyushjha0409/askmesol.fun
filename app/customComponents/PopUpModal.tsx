import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

type Props = {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void | undefined;
  blinkId: string;
  copied: boolean;
  handleCopy: () => void;
  icon: React.ReactNode;
};

const PopUpModal = ({
  isModalOpen,
  setIsModalOpen,
  blinkId,
  handleCopy,
  icon,
}: Props) => {
  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Your Blink has been created!</DialogTitle>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <p className="text-sm font-medium leading-none">Blink ID</p>
            <p className="text-sm text-muted-foreground">{blinkId}</p>
          </div>
          <Button onClick={handleCopy}>
            {icon}
            Copy Link
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PopUpModal;
