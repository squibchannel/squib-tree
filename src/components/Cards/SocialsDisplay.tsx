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
import { SocialProps } from "@/lib/const";

function SocialsDisplay() {
  const { squibSocials, userSocials, removeSocialLink, handleSocialChange } =
    useTree();
  const session = useSession();

  const [socials, setSocials] = useState<SocialProps[]>([]);
  const [editMode, setEditMode] = useState<{ [key: number]: boolean }>({});
  const [tempSocials, setTempSocials] = useState<SocialProps[]>([]);
  const [isSquib, setIsSquib] = useState<boolean>(false);

  useEffect(() => {
    if (session.data?.user.name === "squib_channel") {
      setSocials(squibSocials);
      setIsSquib(!!session.data?.user.name);
    } else {
      setSocials(userSocials);
      setIsSquib(!!session.data?.user.name);
    }
  }, [session.data?.user.name, squibSocials, userSocials, editMode]);

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
      const oldSocials = [...tempSocials];
      setSocials(oldSocials);
      setEditMode({ ...editMode, [index]: false });

      //FIXME: Does not re-render and return to the original info on edit click. it remembers anything typed

      // window.location.reload();
    } else {
      // Delete action
      //TODO: Investigate possible re-rendering issue on the isSquib check.
      // Set state and useEffect for check instead?
      removeSocialLink(index, isSquib);
      setSocials((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleEditClick = (index: number) => {
    setEditMode({ ...editMode, [index]: true });
    const originalSocials = [...socials];
    setTempSocials(originalSocials);
    console.log(tempSocials);
  };

  const handleSaveClick = (index: number) => {
    setEditMode({ ...editMode, [index]: false });

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
    </>
  );
}

export default SocialsDisplay;
