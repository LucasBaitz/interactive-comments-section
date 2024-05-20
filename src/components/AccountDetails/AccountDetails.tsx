import { uploadPicture } from "@/api/authApi";
import React, { useState } from "react";
import ImageUpload from "../ImageUpload/ImageUpload";
import { User } from "@/interfaces/User/User";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { getUserEmail, getUserUsername } from "@/utils/userStorage";

interface AccountDetails {
  currentProfilePicture: string;
}

const AccountDetails: React.FC = () => {
  const [accountData, setAccountData] = useState<User>({
    userName: "",
    email: "",
    image: "",
  });

  const [newImage, setNewImage] = useState<File | null>(null);

  const onImageChange = async (file: File) => {
    setNewImage(file);
  };

  const onUpdate = async () => {
    if (newImage) {
      const response = await uploadPicture(newImage);
      localStorage.setItem("picture", response.data);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white">
      <div className="flex items-center justify-center">
        <ImageUpload onImageChange={onImageChange} />
      </div>
      <div className="grid grid-cols-1 items-center gap-4 mb-5">
        <Label htmlFor="username" className="text-start">
          Username
        </Label>
        <Input
          id="username"
          defaultValue={getUserUsername()}
          className="col-span-1"
        />
        <Label htmlFor="email" className="text-start">
          Email
        </Label>
        <Input
          id="email"
          defaultValue={getUserEmail()}
          className="col-span-1"
        />
      </div>
      <Button onClick={onUpdate}>Update</Button>
    </div>
  );
};

export default AccountDetails;
