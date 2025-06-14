// pages/index.js or components/Alert.js (Create a new file if it doesn't exist)
import Image from "next/image";

export default function Alert() {
  return (
    <div className="flex flex-col w-full md:w-9/12  items-start ">
      <div className="flex items-center justify-start bg-yellow-200 bg-opacity-85 p-2 rounded-lg w-full">
        <div className="mr-4 md:flex hidden">
          <Image
            src="/images/Frame.png"
            alt="icon"
            width={53}
            height={53}
            className="flex-shrink-0"
          />
        </div>
        <div className="text-black text-justify font-semibold text-xs md:text-sm  mt-2">
          Please note that once you submit this form, the information provided
          cannot be edited except preference. Kindly review your entries
          carefully before proceeding.
        </div>
      </div>
    </div>
  );
}
