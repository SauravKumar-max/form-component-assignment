import React from "react";
import { IoIosCheckmarkCircle } from "react-icons/io";

type MessageModalPrpos = {
  closeModal: () => void;
};

export const MessageModal = ({ closeModal }: MessageModalPrpos) => {
  return (
    <div className="absolute top-0 left-0 z-20 bg-[#535861BD] w-full h-full flex items-center justify-center">
      <div className="w-4/5 bg-white rounded-3xl px-6 py-8">
        <div className="w-fit mx-auto">
          <IoIosCheckmarkCircle className="w-28 h-24 text-[#4381FF]" />
          <p className="text-center font-semibold text-[#4381FF]">Success!</p>
        </div>
        <p className="text-sm text-center my-4">
          524 entries successfully uploaded
        </p>
        <button
          className="w-full bg-[#3062C8] text-white text-sm py-4 rounded-full"
          onClick={closeModal}
        >
          Go to My Entries
        </button>

        <button
          className="w-full bg-[#E9F0FF] text-[#4381FF] text-sm py-4 mt-4 rounded-full"
          onClick={closeModal}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
