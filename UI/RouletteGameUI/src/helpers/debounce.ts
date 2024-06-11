export default function createDebounce() {
    let timeout:undefined | number;
    return function (fnc: Function, delayMs:number) {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        fnc();
      }, delayMs || 500);
    };
  }