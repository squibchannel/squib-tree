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
      <RenderMarquee />
      <CopyHashesButton />
      <div className="flex flex-row justify-center mt-4">
        <KeywordHashSearch />
        <ImageHashSearch />
      </div>
    </div>
  );
}
