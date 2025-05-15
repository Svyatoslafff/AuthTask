export default function normalizeStringDate(payload: string) {
    const [date, time] = payload.split('T');
    const [normalTime] = time.split('.');
    return `${date} ${normalTime}`;
}
