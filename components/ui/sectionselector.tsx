"use client";

import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Toggle } from "@/components/ui/toggle";
import style from "@/components/ui/sectionselector.module.css";

type STATION_DATA = { line: string; name: string };
type HISTORY_DATA = { origin: STATION_DATA; destination: STATION_DATA };
type TOGGLE_STATE = STATION_DATA | null;

function StationToggle(props: {
    station: STATION_DATA;
    state: TOGGLE_STATE;
    setState: Dispatch<SetStateAction<TOGGLE_STATE>>;
}) {
    return (
        <Toggle
            variant="outline"
            size="sm"
            className={style.toggle}
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
    stations: STATION_DATA[];
    histories?: HISTORY_DATA[];
}) {
    const stations = useMemo(() => {
        const stations: (STATION_DATA & {
            history: boolean;
            interval: boolean;
        })[] = [];
        const histories: (HISTORY_DATA & { checking?: boolean })[] | undefined =
            props.histories;

        for (const [i, station] of props.stations.entries()) {
            if (i > 0 && props.stations[i - 1].line !== station.line) {
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
                    if (i === 0 || i === props.stations.length - 1) {
                        history = true;
                    }

                    interval = !!!x.checking;
                    x.checking = !!!x.checking;
                } else {
                    history ||= !!x.checking;
                    interval ||= !!x.checking;
                }
            });

            stations.push({ ...station, history, interval });
        }

        return stations;
    }, [props]);

    const [origin, setOrigin] = useState<TOGGLE_STATE>(null);
    const [destination, setDestination] = useState<TOGGLE_STATE>(null);
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
                        disabled={true}
                        checked={checked && !station.history}
                        className={style.checkbox}
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

        if (i !== props.stations.length - 1) {
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
        <div>
            <input
                type="hidden"
                name="origin.line"
                value={origin?.line}
                required={true}
            />
            <input
                type="hidden"
                name="origin.name"
                value={origin?.name}
                required={true}
            />
            <input
                type="hidden"
                name="destination.line"
                value={destination?.line}
                required={true}
            />
            <input
                type="hidden"
                name="destination.name"
                value={destination?.name}
                required={true}
            />
            <table>
                <tbody>{children}</tbody>
            </table>
        </div>
    );
}
