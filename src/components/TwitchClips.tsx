import { getClips } from "@/actions/twitchRequests";
import { toast } from "sonner";
import ClipCard from "./ClipCard";

async function TwitchClips() {
  const res = await getClips();

  if (!res) {
    toast.error("Response failed");
    return;
  }

  const clips = res.data;
  const clipPagination = res.pagination.cursor;
  console.log(clips);

  return (
    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-4 w-[90vw] mx-auto mb-4">
      {clips &&
        clips.map((clip) => {
          return (
            <ClipCard
              key={clip.id}
              clipTitle={clip.title}
              viewCount={clip.view_count}
              embedUrl={clip.embed_url}
              clipCreator={clip.creator_name}
            />
          );
        })}
    </div>
  );
}

export default TwitchClips;
