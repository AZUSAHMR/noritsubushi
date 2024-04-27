import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
    return (
        <>
            <div className="lg:flex lg:justify-center">
                <Card className="lg:grow lg:basis-0 m-2">
                    <CardHeader>
                        <CardTitle>노선으로 등록</CardTitle>
                        <CardDescription>
                            지역별로 노선을 선택하여 등록합니다
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex justify-center">
                        <Button className="grow basis-0 mx-1" asChild>
                            <Link href="/line/all">전국</Link>
                        </Button>
                        <Button className="grow basis-0 mx-1" asChild>
                            <Link href="/line/mp">수도권</Link>
                        </Button>
                        <Button className="grow basis-0 mx-1" asChild>
                            <Link href="/line/cc">충청권</Link>
                        </Button>
                        <Button className="grow basis-0 mx-1" asChild>
                            <Link href="/line/hn">호남권</Link>
                        </Button>
                        <Button className="grow basis-0 mx-1" asChild>
                            <Link href="/line/yn">영남권</Link>
                        </Button>
                    </CardContent>
                </Card>
                <Card className="lg:grow lg:basis-0 m-2">
                    <CardHeader>
                        <CardTitle>운행계통으로 등록</CardTitle>
                        <CardDescription>
                            지역별로 운행계통을 선택하여 등록합니다
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex justify-center">
                        <Button className="grow basis-0 mx-1" asChild>
                            <Link href="/system/all">전국</Link>
                        </Button>
                        <Button className="grow basis-0 mx-1" asChild>
                            <Link href="/system/mp">수도권</Link>
                        </Button>
                        <Button className="grow basis-0 mx-1" asChild>
                            <Link href="/system/cc">충청권</Link>
                        </Button>
                        <Button className="grow basis-0 mx-1" asChild>
                            <Link href="/system/hn">호남권</Link>
                        </Button>
                        <Button className="grow basis-0 mx-1" asChild>
                            <Link href="/system/yn">영남권</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
