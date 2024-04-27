"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { AREA_LIST } from "@/types/noritsubushi";
import lineData from "@/public/line.json";

export function LineList(props: {
    isSystem?: boolean;
    area: (typeof AREA_LIST)[number];
}) {
    return Object.keys(lineData).map((line) => {
        const stations = Object.keys(lineData[line]);
        return (
            <Link key={line} href={`/line/${line}`}>
                <Card className="lg:grow lg:basis-0 m-2">
                    <CardHeader>
                        <CardTitle>{line}</CardTitle>
                        <CardDescription>
                            {stations.at(0)} ~ {stations.at(-1)}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex justify-center">
                        <div className="grow basis-0 mx-4 text-right">
                            전체 km
                        </div>
                        <div className="grow basis-0 mx-4 text-left">
                            {Object.values(lineData[line]).at(-1)! / 1000}
                        </div>
                        <div className="grow basis-0 mx-4 text-right">
                            승차 km
                        </div>
                        <div className="grow basis-0 mx-4 text-left">
                            {23.4}
                        </div>
                        <div className="grow basis-0 mx-4 text-right">
                            미승 km
                        </div>
                        <div className="grow basis-0 mx-4 text-left">
                            {(Object.values(lineData[line]).at(-1)! - 23400) /
                                1000}
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Progress
                            value={
                                (23400 /
                                    Object.values(lineData[line]).at(-1)!) *
                                100
                            }
                        />
                    </CardFooter>
                </Card>
            </Link>
        );
    });
}
