"use client";
import { base64Schema } from "@/schema/base64";
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
  const [base64, setBase64] = useState<string>("");
  const [imgFile, setImgFile] = useState<string>();

  const { updateTags } = useTags();

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImgFile(imageUrl);

      const reader = new FileReader();
      reader.onload = () => {
        let base64String = reader.result;

        if (!base64String || typeof base64String !== "string") {
          return;
        }

        const splittedString: string = base64String.split(",")[1];

        try {
          base64Schema.parse(splittedString);
        } catch (error) {
          setBase64("");
          toast.error("invalid base64 string", { position: "bottom-right" });
          return;
        }
        setBase64(splittedString);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await hashImageSearch(base64);

    if (!res) {
      toast.error("we fucked up");
      return;
    }

    updateTags({
      newTags: res.tags,
      newTitle: `Top ${res.tags.length} Keywords Related to your image`,
      newImage: imgFile,
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
              {base64 && <Button>Search</Button>}
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export default ImageHashSearch;
