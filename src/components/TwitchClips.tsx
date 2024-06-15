"use client";

import { useEffect, useState } from "react";
import { getClips } from "@/actions/twitchRequests";
import { toast } from "sonner";
import ClipGrid from "./ClipGrid";
import PaginationNav from "./nav/PaginationNav";
import { Clip, GetClipsResponse } from "@/types/api/twitchAPI";

function TwitchClips() {
  const [clips, setClips] = useState<Clip[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [prevCursorStack, setPrevCursorStack] = useState<string[]>([]);
  const [isInitRender, setIsInitRender] = useState<boolean>(true);

  async function fetchClips(
    after: string | null = null,
    before: string | null = null,
    cursor: string | null = null
  ) {
    try {
      console.log("Fetching Clips - After:", after, "Before:", before);
      const res: GetClipsResponse = await getClips({ after, before });
      console.log(res);

      if (!res) {
        toast.error("Response failed");
        return;
      }

      const newClips = res.data;
      setClips(newClips);

      if (!res.pagination) {
        toast.error("No pagination cursor provided");
      } else if (res.pagination.cursor) {
        setCursor(res.pagination.cursor);
        if (!prevCursorStack.includes(res.pagination.cursor)) {
          setPrevCursorStack((prevStack) => {
            if (cursor !== null) {
              return [...prevStack, cursor];
            }
            // console.log("PrevStack", prevStack, "Cursor", cursor);
            return prevStack;
          });
        }
      }
    } catch (error) {
      console.error("Failed to fetch clips:", error);
      toast.error("Failed to fetch clips");
    }
  }

  const handleNextPage = () => {
    if (cursor) {
      fetchClips(cursor, null); // Fetch next page using the next cursor
    }
  };

  const handlePrevPage = () => {
    if (cursor) {
      const backCursor = prevCursorStack.findIndex((cur) => cur === cursor);
      fetchClips(null, prevCursorStack[backCursor]);
    }
  };

  useEffect(() => {
    if (isInitRender) {
      fetchClips(); // Fetch initial clips when the component mounts
      setIsInitRender(false);
    }
  }, [isInitRender]);

  return (
    <div>
      <PaginationNav onNextPage={handleNextPage} onPrevPage={handlePrevPage} />
      <ClipGrid clips={clips} />
    </div>
  );
}

export default TwitchClips;
