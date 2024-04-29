import {supabase} from "../supabaseClient";
import moment from "moment";

const fetchSleep = async () => {
    const {
        data: {user},
    } = await supabase.auth.getUser();
    let {data: SleepProgram, error} = await supabase
        .from("SleepProgram")
        .select("*")
        .eq("userId", user.id);
    if (error) console.log("error", error);

    return SleepProgram;
};

export const loadSleepInfo = async (dateSelected) => {
    try {
        const response = await fetchSleep();
        const selectedEntry = response.find(
            (entry) => new Date(entry.date).toLocaleDateString() === dateSelected
        );
        if (selectedEntry !== undefined) {
            const sleepTime = new Date(selectedEntry.sleepTime).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            });
            const wakeTime = new Date(selectedEntry.wakeTime).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            });
            return { sleep: response, sleepTime, wakeTime, isLoading: false };
        }
    } catch (error) {
        console.error("Error fetching sleep data:", error);
    }
    return { sleep: [], sleepTime: "", wakeTime: "", isLoading: false };
};

const insertSleepProgram = async (date, sleepTime, wakeTime) => {
    const {
        data: {user},
    } = await supabase.auth.getUser();
    const userId = user.id;
    const dateMoment = moment(date, "DD/MM/YYYY");
    const nextDay = moment(date, "DD/MM/YYYY").add(1, "days");
    const sleepTimeMoment = moment(sleepTime, "HH:mm");
    const wakeTimeMoment = moment(wakeTime, "HH:mm");

    const combinedSleepDateTime = dateMoment
        .set({
            hour: sleepTimeMoment.get("hour"),
            minute: sleepTimeMoment.get("minute"),
        })
        .format();

    const combinedWakeDateTime = nextDay
        .set({
            hour: wakeTimeMoment.get("hour"),
            minute: wakeTimeMoment.get("minute"),
        })
        .format();

    let {data, error} = await supabase.from("SleepProgram").insert([
        {
            userId: userId,
            date: dateMoment.format(),
            sleepTime: combinedSleepDateTime,
            wakeTime: combinedWakeDateTime,
        },
    ]);
    if (error) console.log("error", error);

    return data;
};

const updateSleepProgram = async (date, entity, sleepTime, wakeTime) => {
    const dateMoment = moment(date, "DD/MM/YYYY");
    const nextDay = moment(date, "DD/MM/YYYY").add(1, "days");
    const sleepTimeMoment = moment(sleepTime, "HH:mm");
    const wakeTimeMoment = moment(wakeTime, "HH:mm");

    const combinedSleepDateTime = dateMoment
        .set({
            hour: sleepTimeMoment.get("hour"),
            minute: sleepTimeMoment.get("minute"),
        })
        .format();

    const combinedWakeDateTime = nextDay
        .set({
            hour: wakeTimeMoment.get("hour"),
            minute: wakeTimeMoment.get("minute"),
        })
        .format();

    console.log(combinedSleepDateTime);

    const {data, error} = await supabase
        .from("SleepProgram")
        .update({
            userId: entity.userId,
            date: entity.date,
            sleepTime: combinedSleepDateTime,
            wakeTime: combinedWakeDateTime,
        })
        .eq("id", entity.id)
        .select();

    if (error) console.log("error", error);

    return data;
};

export {fetchSleep, insertSleepProgram, updateSleepProgram};
