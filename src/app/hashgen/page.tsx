// https://mukeshsolanki.gitbook.io/hashtag-api/reference/api-reference/hashtags

import CopyHashesButton from "@/components/CopyHashesButton";
import KeywordHashSearch from "@/components/KeywordHashSearch";
import RenderMarquee from "@/components/RenderMarquee";
import HashTitle from "@/components/HashTitle";
import ImageHashSearch from "@/components/ImageHashSearch";

export default async function HashGen() {
  return (
    <div className="main flex justify-center flex-col ">
      <HashTitle />
      <div className="mx-auto relative flex h-96 flex-row items-center justify-center overflow-hidden rounded-lg border bg-background sm:px-20 md:shadow-xl max-w-[90%]">
        <RenderMarquee />
      </div>
      <CopyHashesButton />
      <div className="flex flex-row justify-center mt-4">
        <KeywordHashSearch />
        <ImageHashSearch />
      </div>
    </div>
  );
}
