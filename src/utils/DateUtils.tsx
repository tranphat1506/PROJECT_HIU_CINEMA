export function formatTwoDigits(n: number) {
    return n < 10 ? '0' + n : n;
}
export const formatDay = (time: number): string => {
    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);
    if (days < 0 && hours < 0 && minutes < 0 && seconds < 0)
        return '00' + 'd:' + '00' + 'h:' + '00' + 'm:' + '00' + 's';
    return (
        formatTwoDigits(days) +
        'd:' +
        formatTwoDigits(hours) +
        'h:' +
        formatTwoDigits(minutes) +
        'm:' +
        formatTwoDigits(seconds) +
        's'
    );
};
export function dateToMilliseconds(
    hours: number,
    minutes: number,
    seconds: number,
    day: number,
    month: number,
    year: number,
): number {
    const date = new Date(year, month - 1, day, hours, minutes, seconds);
    return date.getTime();
}
