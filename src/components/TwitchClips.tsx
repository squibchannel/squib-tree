"use client";

import { getClips } from "@/actions/twitchRequests";
import { toast } from "sonner";
import ClipGrid from "./ClipGrid";
import PaginationNav from "./nav/PaginationNav";
import { useEffect, useState } from "react";
import { Clip, GetClipsResponse } from "@/types/api/twitchAPI";

function TwitchClips() {
  const [clips, setClips] = useState<Clip[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [prevCursor, setPrevCursor] = useState<string | null>(null);
  const [currentCursor, setCurrentCursor] = useState<string | null>(null);

  async function fetchClips(
    after: string | null = null,
    before: string | null = null
  ) {
    try {
      const res: GetClipsResponse = await getClips({ after, before });

      if (!res) {
        toast.error("Response failed");
        return;
      }

      const newClips = res.data;
      setClips(newClips);

      if (res.pagination) {
        setNextCursor(res.pagination.cursor); // Set next cursor directly from the response

        // Update prevCursor based on the currentCursor when navigating backward
        if (after) {
          // If after is provided, set the previous cursor to the current after cursor
          setPrevCursor(currentCursor);
        } else if (before) {
          // If before is provided, set the previous cursor to the cursor of the last item in the previous page
          const lastItemIndex = newClips.length - 1;
          const prevPageCursor = newClips[lastItemIndex].id;
          setPrevCursor(prevPageCursor);
        }

        // Update currentCursor with the current after cursor
        setCurrentCursor(after);
      }
    } catch (error) {
      console.error("Failed to fetch clips:", error);
      toast.error("Failed to fetch clips");
    }
  }

  const handleNextPage = () => {
    fetchClips(nextCursor, null); // Fetch next page using next cursor
  };

  const handlePrevPage = () => {
    fetchClips(null, prevCursor); // Fetch previous page using previous cursor
  };

  useEffect(() => {
    fetchClips(); // Fetch initial clips when component mounts
  }, []);

  return (
    <div>
      <PaginationNav onNextPage={handleNextPage} onPrevPage={handlePrevPage} />
      <ClipGrid clips={clips} />
    </div>
  );
}

export default TwitchClips;
