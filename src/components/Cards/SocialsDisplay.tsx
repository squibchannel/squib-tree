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

  const [socials, setSocials] = useState(userSocials);
  const [editMode, setEditMode] = useState<boolean[]>([]); // Track edit mode for each social card

  useEffect(() => {
    if (session.data?.user.name === "squib_channel") {
      setSocials(squibSocials);
    }
  }, [session.data?.user.name]);

  useEffect(() => {
    setSocials(squibSocials);
  }, [squibSocials]);

  const newSocial = {
    platform: "twatter",
    description: "a place to twaaat",
    href: "x.com",
  };

  const handleAdd = () => {
    console.log("New social added");
    addSocialLink(newSocial, session?.data?.user?.name === "squib_channel");
  };

  const handleEditToggle = (index: number) => {
    setEditMode({ ...editMode, [index]: !editMode[index] }); // Toggle edit mode for the clicked index
  };

  const handleChange = (e: any, index: number) => {
    const field = e.target.getAttribute("data-field");
    const value = e.target.value;
    handleSocialChange(
      index,
      field,
      value,
      session?.data?.user?.name === "squib_channel"
    );
  };

  const handleDelete = (index: number) => {
    removeSocialLink(index, session?.data?.user?.name === "squib_channel");
  };

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
          <ul className="text-center grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {socials.map((social, i) => (
              <Card
                key={social.platform + `-index-${i}`}
                className="flex flex-col p-4 gap-4 justify-center"
              >
                {editMode[i] ? (
                  <>
                    <li>
                      <input
                        type="text"
                        data-field="platform"
                        value={social.platform}
                        onChange={(e) => handleChange(e, i)}
                        className="w-full text-center"
                      />
                    </li>
                    <li>
                      <input
                        type="text"
                        data-field="description"
                        value={social.description}
                        onChange={(e) => handleChange(e, i)}
                        className="w-full text-center"
                      />
                    </li>
                    <li className="break-words">
                      <input
                        type="text"
                        data-field="href"
                        value={social.href}
                        onChange={(e) => handleChange(e, i)}
                        className="w-full text-center"
                      />
                    </li>
                  </>
                ) : (
                  <>
                    <li>{social.platform}</li>
                    <li>{social.description}</li>
                    <li className="break-words">
                      <Link href={social.href} target="_blank">
                        {social.href}
                      </Link>
                    </li>
                  </>
                )}
                <div className="mt-auto text-center">
                  <Button
                    onClick={() => handleEditToggle(i)}
                    className="w-fit mr-2"
                  >
                    {editMode[i] ? "Save" : "Edit"}
                  </Button>
                  <Button onClick={() => handleDelete(i)} className="w-fit">
                    Delete
                  </Button>
                </div>
              </Card>
            ))}
          </ul>
        </CardContent>
      </Card>
      <Button className="mt-4" onClick={handleAdd}>
        Add New
      </Button>
    </>
  );
}

export default SocialsDisplay;
