"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ko } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { SectionSelector } from "@/components/ui/sectionselector";
import { useEffect, useState } from "react";
import { HISTORY_DATA, TOGGLE_STATE } from "@/types/noritsubushi";

const FormSchema = z.object({
    origin: z.string().min(1, {
        message: "출발지가 선택되지 않았습니다.",
    }),
    destination: z.string().min(1, {
        message: "도착지가 선택되지 않았습니다.",
    }),
    boarded_at: z.date().optional(),
    memo: z.string().optional(),
});

export function SaveForm(props: { name: string; histories?: HISTORY_DATA[] }) {
    const [origin, setOrigin] = useState<TOGGLE_STATE>(null);
    const [destination, setDestination] = useState<TOGGLE_STATE>(null);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            origin: "",
            destination: "",
        },
    });

    useEffect(() => {
        form.setValue("origin", origin?.name || "");
        form.setValue("destination", destination?.name || "");
    }, [origin, destination]);

    function onSubmit(data: z.infer<typeof FormSchema>) {
        console.log(JSON.stringify(data, null, 2));
    }

    return (
        <div className="md:flex">
            <div className="flex justify-center m-4">
                <SectionSelector
                    name={props.name}
                    origin={origin}
                    setOrigin={setOrigin}
                    destination={destination}
                    setDestination={setDestination}
                    histories={props.histories}
                />
            </div>
            <div className="md:grow m-4">
                <div className="md:sticky md:top-0">
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-8"
                        >
                            <FormField
                                control={form.control}
                                name="origin"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>출발지</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="미선택"
                                                {...field}
                                                readOnly
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="destination"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>도착지</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="미선택"
                                                {...field}
                                                readOnly
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="boarded_at"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>승차일</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "w-[240px] pl-3 text-left font-normal",
                                                            !field.value &&
                                                                "text-muted-foreground",
                                                        )}
                                                    >
                                                        {field.value ? (
                                                            format(
                                                                field.value,
                                                                "yyyy-MM-dd",
                                                            )
                                                        ) : (
                                                            <span>미선택</span>
                                                        )}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent
                                                className="w-auto p-0"
                                                align="start"
                                            >
                                                <Calendar
                                                    locale={ko}
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormDescription>
                                            승차일은 선택하지 않아도 됩니다.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="memo"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>메모</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="미입력"
                                                className="resize-none"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            메모는 입력하지 않아도 됩니다.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit">저장</Button>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    );
}
