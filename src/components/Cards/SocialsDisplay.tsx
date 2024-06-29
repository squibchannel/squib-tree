"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import useTree from "@/hooks/useTree";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "../ui/button";
import { SocialProps } from "@/lib/const";

function SocialsDisplay() {
  const {
    squibSocials,
    userSocials,
    addSocialLink,
    removeSocialLink,
    handleSocialChange,
  } = useTree();
  const session = useSession();

  const [socials, setSocials] = useState<SocialProps[]>([]);
  const [editMode, setEditMode] = useState<{ [key: number]: boolean }>({});
  const [tempSocials, setTempSocials] = useState<SocialProps[]>([]);

  useEffect(() => {
    if (session.data?.user.name === "squib_channel") {
      setSocials(squibSocials);
    } else {
      setSocials(userSocials);
    }
  }, [session.data?.user.name, squibSocials, userSocials]);

  const newSocial = {
    platform: "twatter",
    description: "a place to twaaat",
    href: "x.com",
  };

  const handleAdd = () => {
    console.log("New social added");
    addSocialLink(newSocial, session.data?.user.name === "squib_channel");
  };

  const handleChange = (
    index: number,
    field: keyof SocialProps,
    value: string
  ) => {
    const updatedSocials = [...socials];
    updatedSocials[index][field] = value;
    setSocials(updatedSocials);
  };
  const handleDelete = (index: number) => {
    if (editMode[index]) {
      // Cancel edit mode
      setSocials(tempSocials);
      setEditMode({ ...editMode, [index]: false });
    } else {
      // Delete action
      const isSquib = session.data?.user.name === "squib_channel";
      removeSocialLink(index, isSquib);
      setSocials((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleEditClick = (index: number) => {
    setTempSocials([...socials]); // Store the current state to revert if needed
    setEditMode({ ...editMode, [index]: true });
  };

  const handleSaveClick = (index: number) => {
    setEditMode({ ...editMode, [index]: false });
    const isSquib = session.data?.user.name === "squib_channel";
    handleSocialChange(index, "platform", socials[index].platform, isSquib);
    handleSocialChange(
      index,
      "description",
      socials[index].description,
      isSquib
    );
    handleSocialChange(index, "href", socials[index].href, isSquib);
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
          <ul className="break-words text-center grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {socials.map((social, i) => (
              <Card
                key={social.platform + `-index-${i}`}
                className="flex flex-col p-4 gap-4 justify-center"
              >
                <li>
                  {editMode[i] ? (
                    <textarea
                      value={social.platform}
                      onChange={(e) =>
                        handleChange(i, "platform", e.target.value)
                      }
                      className="w-full h-16 resize-none"
                    />
                  ) : (
                    social.platform
                  )}
                </li>
                <li>
                  {editMode[i] ? (
                    <textarea
                      value={social.description}
                      onChange={(e) =>
                        handleChange(i, "description", e.target.value)
                      }
                      className="w-full h-16 resize-none"
                    />
                  ) : (
                    social.description
                  )}
                </li>
                <li className="break-words">
                  {editMode[i] ? (
                    <textarea
                      value={social.href}
                      onChange={(e) => handleChange(i, "href", e.target.value)}
                      className="w-full h-16 resize-none"
                    />
                  ) : (
                    <Link href={social.href} target="_blank">
                      {social.href}
                    </Link>
                  )}
                </li>
                <div className="mt-auto text-center">
                  {editMode[i] ? (
                    <>
                      <Button
                        onClick={() => handleSaveClick(i)}
                        className="w-fit mr-2"
                      >
                        Save
                      </Button>
                      <Button onClick={() => handleDelete(i)} className="w-fit">
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        onClick={() => handleEditClick(i)}
                        className="w-fit mr-2"
                      >
                        Edit
                      </Button>
                      <Button onClick={() => handleDelete(i)} className="w-fit">
                        Delete
                      </Button>
                    </>
                  )}
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
