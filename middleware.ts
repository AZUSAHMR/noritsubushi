import { withAuth } from "next-auth/middleware";
import { SIGNIN_PATH } from "./auth";

export default withAuth({
    pages: {
        signIn: SIGNIN_PATH,
    }
});
