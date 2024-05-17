import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SquibTitleCard() {
  return (
    <Card className="flex justify-center flex-col items-center w-3/4 border-none flex-none pb-10">
      <CardHeader>
        <CardTitle>
          <p className="pb-5 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            squib_channel
          </p>
        </CardTitle>
        <CardDescription className="flex justify-center pb-2">
          <Image
            src="/squib_coin_sticker.png"
            alt="haha"
            width={150}
            height={150}
          />
        </CardDescription>
      </CardHeader>
      {/* <CardContent className="text-center">
        <p>Hello and welcome to the squib_channel!</p>
      </CardContent> */}
      {/* <CardFooter>
        <Link
          className={buttonVariants({ variant: "outline" })}
          href="https://www.twitch.tv/squib_channel"
          target="_blank"
        >
          Click here
        </Link>
      </CardFooter> */}
    </Card>
  );
}
