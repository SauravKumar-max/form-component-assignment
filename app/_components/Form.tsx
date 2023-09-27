"use client";

import React, { useState } from "react";
import { CiMail } from "react-icons/ci";
import { FaFileUpload } from "react-icons/fa";
import { ImSpinner } from "react-icons/im";
import { MessageModal } from "./MessageModal";
import { HiArrowLeft } from "react-icons/hi2";

export const Form = () => {
  const [jsonContent, setJsonContent] = useState<JSON | null>(null);
  const [isJsonFile, setIsJsonFile] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  function uploadJsonFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (file) {
      const fileName = file.name;
      const fileExtension = fileName.split(".").pop();

      if (fileExtension?.toLowerCase() === "json") {
        const reader = new FileReader();
        setLoading(true);
        reader.onload = (event) => {
          const result = event.target?.result as string;
          const jsonData = JSON.parse(result);
          setTimeout(() => {
            setJsonContent(jsonData);
            setLoading(false);
          }, 3000);
        };

        reader.readAsText(file);
      } else {
        setIsJsonFile(false);
        setJsonContent(null);
        e.target.value = "";
      }
    }
  }

  function onSubmitClick(e: React.FormEvent<HTMLButtonElement>) {
    e.preventDefault();
    setShowModal(true);
    setJsonContent(null);
  }

  function closeModal() {
    setShowModal(false);
  }

  return (
    <div className="relative bg-white p-5">
      {showModal && <MessageModal closeModal={closeModal} />}
      <div className="flex items-center gap-5">
        <button>
          <HiArrowLeft className="text-xl fill-black" />
        </button>
        <h2 className="text-xl text-[#292727] font-semibold tracking-wide">
          Submit form
        </h2>
      </div>
      <form className=" mt-5 flex flex-col gap-4">
        <div>
          <label htmlFor="full-name" className="text-sm text-[#292727]">
            Full Name
          </label>
          <input
            id="full-name"
            name="full-name"
            type="text"
            placeholder="Full Name"
            className="block w-full mt-4 bg-[#FAFAFA] py-3 px-4 rounded-xl"
          />
        </div>
        <div>
          <label htmlFor="email" className="text-sm text-[#292727]">
            Email
          </label>
          <div className="relative mt-4 rounded-xl">
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              className="block w-full bg-[#FAFAFA] py-3 pl-4 pr-10 rounded-xl"
            />
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <CiMail className="h-4 w-4 text-[#A0A0A0]" />
            </div>
          </div>
        </div>
        <div>
          <label htmlFor="upload-json" className="text-sm text-[#292727]">
            Upload JSON File
          </label>
          <div>
            <div className="relative mt-4 h-28 rounded-xl">
              <input
                id="upload-json"
                name="upload-json"
                type="file"
                accept="application/JSON"
                className="absolute top-0 left-0 z-10 w-full h-full opacity-0 rounded-xl"
                onChange={uploadJsonFile}
              />
              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-[#FAFAFA] border border-dashed border-spacing-16 border-[#D9D9D9] rounded-xl">
                <div className="flex items-center flex-col gap-2">
                  {!loading ? (
                    <>
                      <FaFileUpload className="w-5 h-6 text-[#4381FF]" />
                      <span className="text-[#A0A0A0] text-xs font-semibold">
                        Browse File
                      </span>
                    </>
                  ) : (
                    <>
                      <ImSpinner className="w-9 h-9 text-[#4381FF] animate-spin" />
                      <span className="text-[#4381FF] text-xs font-semibold">
                        Validating...
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
            {!isJsonFile && (
              <small className="text-xs text-red-500">
                Please select a JSON file
              </small>
            )}
          </div>
        </div>
        <div>
          <p className="text-sm text-[#292727]">File Contents</p>
          <div className="w-full h-36 mt-4 bg-[#FAFAFA] py-3 px-4 rounded-xl overflow-auto">
            {jsonContent && (
              <pre className="text-sm">
                {JSON.stringify(jsonContent, null, 2)}
              </pre>
            )}
          </div>
        </div>
        <div className="mt-9 pb-4">
          <button
            className={`w-full rounded-full py-4 text-white font-medium ${
              jsonContent !== null
                ? "bg-[#3063c8]"
                : "bg-[#3062C880] cursor-not-allowed"
            }`}
            onClick={onSubmitClick}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
