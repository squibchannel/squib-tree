"use client";

import { auth } from "@/auth";
import { Session } from "next-auth";
import React, { ReactNode, createContext, useState } from "react";

async function TwitchSessionProvider() {
  return <div>session-provider</div>;
}

export default TwitchSessionProvider;
