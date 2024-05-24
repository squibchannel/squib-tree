"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { hashGenSearch } from "@/actions/hashTagSearches";
import useTags from "@/hooks/useTags";

function KeywordHashSearch() {
  const [keyword, setKeyword] = useState("");
  const { updateTags } = useTags();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await hashGenSearch(keyword);

    if (!res) {
      toast.error("we fucked up");
      return;
    }

    updateTags({
      newTags: res.tags,
      newTitle: `Top ${res.tags.length} Keywords Related to ${keyword}`,
    });
  };

  return (
    <Card className="max-w-[40%] ml-6 mt-12 flex flex-col">
      <CardHeader>
        <CardTitle>Keyword Search</CardTitle>
        <CardDescription>Find top hashtags based on a keyword</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-row gap-2">
              <Input
                id="keyword-name"
                placeholder="Enter Keyword Here"
                value={keyword}
                onChange={handleInputChange}
              />
              <Button>Search</Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export default KeywordHashSearch;
