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
import Credentials from "@/interfaces/User/Credentials";
import { login } from "@/api/authApi";
import Loading from "@/components/Loading/Loading";

interface LoginFormProps {
  onSwitchForm?: (changeTo: ActiveForm) => void;
}

const Login: React.FC<LoginFormProps> = ({ onSwitchForm }) => {
  const [credentials, setCredentials] = useState<Credentials>({
    userName: "",
    password: "",
  });

  const [loading, setLoading] = useState<boolean>(false);

  const handleCredentialsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setCredentials((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleLogin = async () => {
    setLoading(true);
    const loginResult = await login(credentials);
    setTimeout(() => {}, 3000);
    if (loginResult) {
      location.reload();
    } else {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>Enter your credentials or</CardDescription>
      </CardHeader>
      {loading ? (
        <CardContent className="w-full h-full min-h-screen flex items-center align-middle justify-center">
          <Loading />
        </CardContent>
      ) : (
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
              type="text"
              placeholder=""
              onChange={handleCredentialsChange}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              onChange={handleCredentialsChange}
            />
          </div>
          <CardFooter className="flex flex-col gap-2">
            <Button className="w-full bg-[#5259B3]" onClick={handleLogin}>
              Login
            </Button>
            {onSwitchForm && (
              <Button
                variant="link"
                onClick={() => onSwitchForm(ActiveForm.Registration)}
              >
                Register
              </Button>
            )}
          </CardFooter>
        </CardContent>
      )}
    </Card>
  );
};

export default Login;
