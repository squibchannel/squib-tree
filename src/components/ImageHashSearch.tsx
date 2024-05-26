"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./ui/card";
import { hashImageSearch } from "@/actions/hashTagSearches";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "sonner";
import useTags from "@/hooks/useTags";

function ImageHashSearch() {
  const [image, setImage] = useState<string>("");
  const { updateTags } = useTags();

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        let base64String = reader.result;

        if (!base64String || typeof base64String !== "string") {
          // TODO: give a error message to the user that there is no string or whatever
          // Toaster

          return;
        }

        /*
            We could send a prompt with this and yeet it an ai image predictor tooooo
        */

        const splittedString: string = base64String.split(",")[1];
        setImage(splittedString);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await hashImageSearch(image);

    if (!res) {
      toast.error("we fucked up");
      return;
    }

    updateTags({
      newTags: res.tags,
      newTitle: `Top ${res.tags.length} Keywords Related to your image`,
    });
  };

  return (
    <Card className="max-w-[40%] ml-6 mt-12 flex flex-col">
      <CardHeader>
        <CardTitle>Image Search</CardTitle>
        <CardDescription>Find top hashtags based on an image</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4 ">
            <div className="flex flex-col gap-2 ">
              <Input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="bg-orange-600"
              />
              {image && <Button>Search</Button>}
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export default ImageHashSearch;
