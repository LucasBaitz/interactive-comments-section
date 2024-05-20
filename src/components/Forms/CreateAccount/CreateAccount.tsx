"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { Button } from "../../ui/button";
import { Label } from "@radix-ui/react-label";
import { Input } from "../../ui/input";
import { Icons } from "../../Icons/Icons";
import { ActiveForm } from "@/interfaces/ActiveForm";
import Registration from "@/interfaces/User/Registration";
import { register } from "@/api/authApi";
import ImageUpload from "@/components/ImageUpload/ImageUpload";

interface CreateAccountProps {
  onSwitchForm?: (changeTo: ActiveForm) => void;
}

const CreateAccount: React.FC<CreateAccountProps> = ({ onSwitchForm }) => {
  const [accountData, setAccountData] = useState<Registration>({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState<boolean>(false);

  const handleAccountDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setAccountData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleRegistration = async () => {
    setLoading(true);
    const registrationResult = await register(accountData);
    console.log(registrationResult);

    if (onSwitchForm && registrationResult) {
      onSwitchForm(ActiveForm.Login);
    }
    setLoading(false);
  };

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Create an account</CardTitle>
        <CardDescription>
          Enter your email below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-1">
          <Button variant="outline">
            <Icons.google className="mr-2 h-4 w-4" />
            Google
          </Button>
        </div>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="userName">Username</Label>
          <Input
            id="userName"
            type="userName"
            placeholder=""
            onChange={(e) => handleAccountDataChange(e)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder=""
            onChange={(e) => handleAccountDataChange(e)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            onChange={(e) => handleAccountDataChange(e)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="confirmPassword"
            onChange={(e) => handleAccountDataChange(e)}
          />
        </div>
        {/* <ImageUpload  /> */}
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        {!loading && (
          <Button className="w-full" onClick={handleRegistration}>
            Create account
          </Button>
        )}

        {onSwitchForm && (
          <Button variant="link" onClick={() => onSwitchForm(ActiveForm.Login)}>
            Already have an account?
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default CreateAccount;
