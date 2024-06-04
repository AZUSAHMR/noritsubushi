import { AuthOptions } from "next-auth";
import NaverProvider from "next-auth/providers/naver";
import KakaoProvider from "next-auth/providers/kakao";

export const SIGNIN_PATH = "/signin";

export const authOptions: AuthOptions = {
    providers: [
        NaverProvider({
            clientId: process.env.NAVER_CLIENT_ID!,
            clientSecret: process.env.NAVER_CLIENT_SECRET!,
        }),
        KakaoProvider({
            clientId: process.env.KAKAO_CLIENT_ID!,
            clientSecret: process.env.KAKAO_CLIENT_SECRET!,
        }),
    ],
    pages: {
        signIn: SIGNIN_PATH,
    },
    callbacks: {
        jwt({ token, account }) {
            if (account) {
                token.id = `${account.provider}:${token.sub}`;
            }
            return token;
        },
        session({ session, token }) {
            if (token) {
                session.user.id = token.id;
            }
            return session;
        },
    },
};
