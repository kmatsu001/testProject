/**
 * index.tsx
 *
 * This file contains the Index component, which serves as the entry point of the application.
 * The Index component redirects users to the Home component upon loading.
 * TypeScript is used for type safety.
 *
 * Author: kazuki.matsuoka
 * Date: 2025/1/19
 */

import { useRouter } from "next/router";
import { useEffect } from "react";

const Index = () => {
  const router = useRouter();

  useEffect(() => {
    // コンポーネントがマウントされたときに /home ルートにリダイレクトする
    router.push("/home");
  }, [router]);

  // コンポーネントは何もレンダリングしません。すぐにリダイレクトされます
  return null;
};

export default Index;
