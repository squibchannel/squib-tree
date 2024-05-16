"use client";

import * as React from "react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { SocialIcon } from "react-social-icons";

interface SocialCardProps {
  key: string;
  title: string;
  description: string;
  href: string;
}

const SocialCard: React.FC<SocialCardProps> = ({
  key,
  title,
  description,
  href,
}) => {
  return (
    <Card id={key + "-social-card"} className="w-1/2">
      <CardHeader className="flex-row gap-5 items-center">
        <CardTitle>
          <SocialIcon network={title} href={href} target="_blank" />
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      {/* <CardContent>{content}</CardContent> */}
    </Card>
  );
};

export default SocialCard;
