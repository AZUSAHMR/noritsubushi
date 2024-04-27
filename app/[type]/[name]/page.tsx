import { authOptions } from "@/auth";
import { getServerSession } from "next-auth/next";
import { db } from "@/lib/kysely";
import { notFound } from "next/navigation";
import lineData from "@/public/line.json";
import { LINE_TYPE, AREA_LIST, TOGGLE_STATE } from "@/types/noritsubushi";
import { LineList } from "@/components/ui/linelist";
import { SaveForm } from "@/components/ui/saveform";

function includes<T, U extends T>(arr: readonly U[], elem: T): elem is U {
    return arr.includes(elem as any);
}

export default async function Page({
    params,
}: {
    params: { type: LINE_TYPE; name: string };
}) {
    const session = await getServerSession(authOptions);
    const name = decodeURIComponent(params.name);

    if (includes(AREA_LIST, name)) {
        return <LineList isSystem={params.type === "system"} area={name} />;
    } else if (params.type === "line") {
        if (!lineData[name]) {
            return notFound();
        }
        const history = await db
            .selectFrom("history")
            .select(["origin", "destination"])
            .where("user_id", "=", session!.user.id)
            .where("line", "=", name)
            .orderBy(db.fn.coalesce("boarded_at", "created_at"), "asc")
            .execute();

        return (
            <SaveForm
                name={name}
                histories={history.map((x) => ({
                    origin: {
                        line: name,
                        name: x.origin,
                    },
                    destination: {
                        line: name,
                        name: x.destination,
                    },
                }))}
            />
        );
    }
}
