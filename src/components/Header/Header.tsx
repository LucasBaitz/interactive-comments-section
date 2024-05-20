"use client";
import React from "react";
import AuthForms from "../AuthForms/AuthForms";
import { isAuthenticated, logout } from "@/api/authApi";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Logo from "../Logo/Logo";
import { Button } from "../ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import AccountDetails from "../AccountDetails/AccountDetails";
import { getUserPicture, getUserUsername } from "@/utils/userStorage";

const Header: React.FC = () => {
  const handleLogout = () => {
    logout();
    location.reload();
  };

  return (
    <header className="flex items-center justify-between bg-white text-white container rounded-full shadow-2xl py-4 px-12 mt-5">
      <div className="flex items-center">
        <Logo />
      </div>
      <nav className="flex items-center">
        <ul className="flex">
          {isAuthenticated() ? (
            <li>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="rounded-full p-0 m-0">
                    <Avatar className="w-12 h-12 outline outline-[#5259B3]">
                      <AvatarImage src={getUserPicture()} />
                      <AvatarFallback>{getUserUsername()[0]}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-56"
                  onCloseAutoFocus={(e) => e.preventDefault()}
                >
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <Dialog>
                      <DialogTrigger className="w-full relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-accent">
                        Profile
                      </DialogTrigger>
                      <DialogContent>
                        <AccountDetails />
                      </DialogContent>
                    </Dialog>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />

                  <DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout}>
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
          ) : (
            <li className="ml-4">
              <AuthForms />
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
