import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { signIn } from "@/auth";

export default function LoginForm() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("twitch", { redirectTo: "/hashgen" });
      }}
    >
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login With Twitch</CardTitle>
        </CardHeader>
        <CardFooter>
          <Button className="w-full">Authenticate</Button>
        </CardFooter>
      </Card>
    </form>
  );
}
