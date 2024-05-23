import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function HashLayout({ children }: Props) {
  return <div>{children}</div>;
}
// https://nextjs.org/docs/app/building-your-application/optimizing/metadata
