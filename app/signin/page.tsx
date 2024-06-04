"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import splash from "@/public/splash.jpg";
import { Suspense } from "react";

function Buttons({ callbackUrl }: { callbackUrl: string }) {
    return (
        <>
            <Button
                onClick={() => signIn("naver", { callbackUrl })}
                className="bg-[#03c75a] hover:bg-[#03c75a]/90"
            >
                네이버 로그인
            </Button>
            <Button
                onClick={() => signIn("kakao", { callbackUrl })}
                className="bg-[#fee500] hover:bg-[#fee500]/90"
            >
                카카오 로그인
            </Button>
        </>
    );
}

function ButtonsWithCallback() {
    return (
        <Buttons callbackUrl={useSearchParams().get("callbackUrl") || "/"} />
    );
}

export default function AuthenticationPage() {
    return (
        <div className="container relative min-h-screen flex-col items-center justify-center grid xl:max-w-none xl:grid-cols-3 xl:px-0">
            <div className="relative hidden h-full flex-col xl:flex dark:border-r col-span-2">
                <Image
                    alt="splash"
                    src={splash}
                    placeholder="blur"
                    fill
                    sizes="100vw"
                    className="object-[65%_center] object-cover"
                />
            </div>
            <div className="xl:p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <div className="flex flex-col space-y-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">
                            noritsubushi.kr
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            소셜 계정으로 로그인
                        </p>
                    </div>
                    <div className="grid gap-6">
                        <Suspense fallback={<Buttons callbackUrl="/" />}>
                            <ButtonsWithCallback />
                        </Suspense>
                    </div>
                </div>
            </div>
        </div>
    );
}
