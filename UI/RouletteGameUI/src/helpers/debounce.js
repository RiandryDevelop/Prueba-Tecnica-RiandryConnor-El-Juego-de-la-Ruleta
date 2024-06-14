export default function createDebounce() {
    let timeout;
    return function (fnc, delayMs) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            fnc();
        }, delayMs || 500);
    };
}
