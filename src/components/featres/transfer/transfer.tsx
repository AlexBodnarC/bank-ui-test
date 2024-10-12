import { Avatar } from "@nextui-org/react";
import { type ReactNode } from "react";
import FormModal from "./ui/modal";

const items = [...Array(30).keys()];
export default function Transfer({ trigger }: { trigger?: ReactNode }) {
  return (
    <div className="flex h-full w-full flex-row items-center justify-start gap-2 px-2">
      <FormModal>{trigger}</FormModal>
      {items.map((i) => (
        <Avatar
          src="https://cdn.images.express.co.uk/img/dynamic/36/590x/wolverine-cigars-842878.jpg?r=1686998680160"
          size="md"
          key={i}
          className="min-w-10" // Adjust as needed
        />
      ))}
    </div>
  );
}
