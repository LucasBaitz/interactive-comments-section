"use client";
import React, { ChangeEvent, useState } from "react";
import { Input } from "../ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getUserPicture, getUserUsername } from "@/utils/userStorage";

interface ImageUploadProps {
  onImageChange: (image: File) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageChange }) => {
  const [previewImage, setPreviewImage] = useState<string | null>(
    getUserPicture()
  );

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      onImageChange(file);
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="shrink-0">
        {previewImage && (
          <Avatar className="h-24 w-24">
            <AvatarImage src={previewImage} />
            <AvatarFallback>{getUserUsername()[0]}</AvatarFallback>
          </Avatar>
        )}
      </div>
      <label className="flex m-5">
        <span className="sr-only">Choose profile photo</span>
        <input
          type="file"
          className="block w-full text-sm text-slate-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-gray-100 file:text-black
            hover:file:bg-gray-300 outline-none border-none p-2"
          onChange={handleImageChange}
        />
      </label>
    </div>
  );
};

export default ImageUpload;
