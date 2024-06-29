"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import useTree from "@/hooks/useTree";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "../ui/button";

function SocialsDisplay() {
  const {
    squibSocials,
    userSocials,
    addSocialLink,
    removeSocialLink,
    handleSocialChange,
  } = useTree();
  const session = useSession();
  console.log(session);

  const [socials, setSocials] = useState(userSocials);

  useEffect(() => {
    if (session.data?.user.name === "squib_channel") {
      setSocials(squibSocials);
    }
  }, [session.data?.user.name]);

  useEffect(() => {
    setSocials(squibSocials);
  }, [squibSocials]);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Current Socials</CardTitle>
          <CardDescription>
            A list of your current socials, update them on this page.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {socials.map((social) => {
              return (
                <Card className="flex flex-col p-4 gap-4 justify-center">
                  <li>{social.platform}</li>
                  <li>{social.description}</li>
                  <li className="break-words">
                    <Link href={social.href} target="_blank">
                      {social.href}
                    </Link>
                  </li>
                </Card>
              );
            })}
          </ul>
        </CardContent>
      </Card>
      {/* <Button onClick={handleNewSocial}>Update</Button> */}
    </>
  );
}

export default SocialsDisplay;
