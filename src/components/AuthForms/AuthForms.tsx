"use client";
import { ActiveForm } from "@/interfaces/ActiveForm";
import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import Login from "../Forms/Login/Login";
import CreateAccount from "../Forms/CreateAccount/CreateAccount";
import { LogIn } from "lucide-react";

const AuthForms: React.FC = () => {
  const [activeForm, setActiveForm] = useState<ActiveForm>(ActiveForm.Login);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" className="bg-[#5357B6]">
          Sign-In
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        {activeForm === ActiveForm.Login ? (
          <Login onSwitchForm={setActiveForm} />
        ) : (
          <CreateAccount onSwitchForm={setActiveForm} />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AuthForms;
