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
  const [currentCursor, setCurrentCursor] = useState<string | null>(null);
  const [isInitRender, setIsInitRender] = useState<boolean>(true);
  async function fetchClips(
    after: string | null = null,
    before: string | null = null,
    cursor: string | null = null
  ) {
    try {
      console.log("Fetching Clips - After:", after, "Before:", before);
      const res: GetClipsResponse = await getClips({ after, before });

      if (!res) {
        toast.error("Response failed");
        return;
      }

      const newClips = res.data;
      setClips(newClips);

      if (!res.pagination) {
        toast.error("No pagination cursor provided");
      } else {
        setCursor(res.pagination?.cursor!);
        setPrevCursorStack([...prevCursorStack, res.pagination?.cursor!]);
        console.log("SETTING CURSOR STATE ", cursor);
      }

      // if (res.pagination) {
      //   if (after) {
      //     if (currentCursor && after !== currentCursor) {
      //       setPrevCursorStack((prev) => [...prev, currentCursor]);
      //     }
      //     setNextCursor(res.pagination.cursor);
      //     setCurrentCursor(after);
      //   } else if (before) {
      //     const updatedPrevStack = prevCursorStack.slice(0, -1);
      //     const previousCursor =
      //       updatedPrevStack[updatedPrevStack.length - 1] || null;
      //     setPrevCursorStack(updatedPrevStack);
      //     setNextCursor(currentCursor);
      //     setCurrentCursor(previousCursor);
      //   } else {
      //     setNextCursor(res.pagination.cursor);
      //     setCurrentCursor(null);
      //   }
      // } else {
      //   setNextCursor(null);
      // }
    } catch (error) {
      console.error("Failed to fetch clips:", error);
      toast.error("Failed to fetch clips");
    }
  }

  const handleNextPage = () => {
    if (cursor) {
      setPrevCursorStack([...prevCursorStack, cursor]);
      console.log(prevCursorStack);
      fetchClips(cursor, null); // Fetch next page using the next cursor
    }
  };

  const handlePrevPage = () => {
    if (cursor) {
      fetchClips(null, prevCursorStack[-1]); // Fetch previous page using the previous cursor
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
