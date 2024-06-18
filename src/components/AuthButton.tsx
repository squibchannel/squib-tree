"use client";

import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";
import { signIn, signOut } from "next-auth/react";

function AuthButton() {
  const { status, data } = useSession();
  const [buttonText, setButtonText] = useState<string>("Login");

  const handleClick = async function () {
    if (status === "authenticated") {
      await signOut();
    } else {
      await signIn("twitch");
    }
  };

  useEffect(() => {
    if (status === "authenticated") setButtonText("logout");
    if (status === "unauthenticated") setButtonText("login");
  }, [status]);

  return (
    <div className="mr-6">
      {status !== "loading" && (
        <Button onClick={handleClick}>{buttonText}</Button>
      )}
    </div>
  );
}

export default AuthButton;
