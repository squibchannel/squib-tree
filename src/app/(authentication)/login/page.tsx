import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

import { signIn } from "@/auth";

export default function LoginForm() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("twitch", { redirectTo: "/dashboard" });
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
