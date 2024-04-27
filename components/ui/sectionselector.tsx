"use client";

import { Dispatch, SetStateAction, useMemo } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Toggle } from "@/components/ui/toggle";
import lineData from "@/public/line.json";
import { HISTORY_DATA, STATION_DATA, TOGGLE_STATE } from "@/types/noritsubushi";

function StationToggle(props: {
    station: STATION_DATA;
    state: TOGGLE_STATE;
    setState: Dispatch<SetStateAction<TOGGLE_STATE>>;
}) {
    return (
        <Toggle
            variant="outline"
            size="sm"
            className="min-w-full"
            pressed={
                props.station.line === props.state?.line &&
                props.station.name === props.state?.name
            }
            onPressedChange={(pressed: boolean) => {
                if (pressed) {
                    props.setState({
                        line: props.station.line,
                        name: props.station.name,
                    });
                } else if (
                    props.station.line === props.state?.line &&
                    props.station.name === props.state?.name
                ) {
                    props.setState(null);
                }
            }}
        >
            {props.station.name}
        </Toggle>
    );
}

export function SectionSelector(props: {
    name: string;
    origin: TOGGLE_STATE;
    setOrigin: Dispatch<SetStateAction<TOGGLE_STATE>>;
    destination: TOGGLE_STATE;
    setDestination: Dispatch<SetStateAction<TOGGLE_STATE>>;
    isSystem?: boolean;
    histories?: HISTORY_DATA[];
}) {
    const stations = useMemo(() => {
        const stations = props.isSystem
            ? []
            : Object.keys(lineData[props.name]).map((x) => ({
                  line: props.name,
                  name: x,
              }));
        const result: (STATION_DATA & {
            history: boolean;
            interval: boolean;
        })[] = [];
        const histories: (HISTORY_DATA & { checking?: boolean })[] | undefined =
            props.histories;

        for (const [i, station] of stations.entries()) {
            if (i > 0 && stations[i - 1].line !== station.line) {
                continue;
            }

            let history = false;
            let interval = false;

            histories?.forEach((x) => {
                if (
                    (x.origin.line === station.line &&
                        x.origin.name === station.name) ||
                    (x.destination.line === station.line &&
                        x.destination.name === station.name)
                ) {
                    if (i === 0 || i === stations.length - 1) {
                        history = true;
                    }

                    interval = !!!x.checking;
                    x.checking = !!!x.checking;
                } else {
                    history ||= !!x.checking;
                    interval ||= !!x.checking;
                }
            });

            result.push({ ...station, history, interval });
        }

        return result;
    }, [props]);

    const { origin, setOrigin, destination, setDestination } = props;
    const children = [];

    let checking = false;

    for (const [i, station] of stations.entries()) {
        let checked = false;

        if (origin && destination) {
            if (
                ~~(
                    origin.line === station.line && origin.name === station.name
                ) ^
                ~~(
                    destination.line === station.line &&
                    destination.name === station.name
                )
            ) {
                checked = true;
                checking = !checking;
            } else {
                checked = checking;
            }
        }

        const key = `${station.line}_${station.name}`;
        children.push(
            <tr key={key}>
                <td key={`${key}_origin`}>
                    <StationToggle
                        station={station}
                        state={origin}
                        setState={setOrigin}
                    />
                </td>
                <td
                    key={`${key}_checkbox`}
                    className={station.history ? "bg-primary" : "bg-secondary"}
                >
                    <Checkbox
                        disabled
                        checked={checked && !station.history}
                        className="!cursor-default !opacity-100"
                    />
                </td>
                <td key={`${key}_destination`}>
                    <StationToggle
                        station={station}
                        state={destination}
                        setState={setDestination}
                    />
                </td>
            </tr>,
        );

        if (i !== stations.length - 1) {
            children.push(
                <tr key={`${key}_interval`} className="h-4">
                    <td key={`${key}_origin_interval`} />
                    <td
                        key={`${key}_checkbox_interval`}
                        className={
                            station.interval ? "bg-primary" : "bg-secondary"
                        }
                    />
                    <td key={`${key}_destination_interval`} />
                </tr>,
            );
        }
    }

    return (
        <table>
            <tbody>{children}</tbody>
        </table>
    );
}
