"use client";

import { ReactNode, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { userStore } from "@/store/userStore";
import { shallow } from "zustand/shallow";
import UserStoreInterface from "@/store/userStore.interface";

interface GuardProps {
  children: ReactNode;
  protectedRoutes: string[];
}

export default function AuthGuard({ children, protectedRoutes }: GuardProps) {
  const path = usePathname();
  const router = useRouter();
  const { setUser, removeUser } = userStore(
    (state) => ({
      setUser: (state as UserStoreInterface).setUser,
      removeUser: (state as UserStoreInterface).removeUser,
    }),
    shallow
  );

  useEffect(() => {
    async function getAuthStatus() {
      const res = await fetch(
        "https://frontendtestapi.staging.fastjobs.io/auth/me",
        {
          credentials: "include",
        }
      );
      if (!res.ok) {
        removeUser();
        if(path=="/"){
          return;
        }
        return router.push("/login");
      }
      const data = await res.json();
      setUser(data.username);
    }
    if (protectedRoutes.includes(path) || path=="/") {
      getAuthStatus();
    }
  }, [path, router, protectedRoutes, removeUser, setUser]);

  return <>{children}</>;
}
