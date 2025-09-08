"use client";

import { SWRConfig } from "swr";
import axios from "axios";
import { useRouter } from "next/navigation";
import { LOCAL_STORAGE_KEYS } from "@/consts/local-storage";
import { useLayoutEffect } from "react";

const isBrowser = typeof window !== "undefined";

const initialAxiosHeaders = () => {
  if (!isBrowser) {
    return;
  }

  const { address, token } = JSON.parse(
    sessionStorage.getItem(LOCAL_STORAGE_KEYS.CURRENT_CONNECTION) ?? "{}"
  );
  if (address) {
    axios.defaults.headers.common["Address"] = address;
    axios.defaults.headers.common["Token"] = token;
  }
};

initialAxiosHeaders();

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  useLayoutEffect(() => {
    const { address } = JSON.parse(
      sessionStorage.getItem(LOCAL_STORAGE_KEYS.CURRENT_CONNECTION) ?? "{}"
    );
    if (!address) {
      router.push("/connect");
    }
  }, []);

  return <SWRConfig value={{}}>{children}</SWRConfig>;
};
