import { FilecoinNumber, Converter } from "@glif/filecoin-number";

const MINUTE = 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;
const WEEK = DAY * 7;
const MONTH = (DAY * 365) / 12;
const YEAR = DAY * 365;

export const formatAsFilecoin = (number: any): string => {
  const printString: string = `${String(number)} FIL`;
  return `${number} FIL`;
};

export const inFIL = (number = 0): string => {
  const filecoinNumber = new FilecoinNumber(`${number}`, "attofil");
  const inFil = filecoinNumber.toFil();
  const printString: string = `${formatAsFilecoin(inFil)}`;
  return printString;
};

export const getBucketDataFromHeader = (header): any => {
  try {
    const entity = header.replace("next-daemon-bucket ", "");
    const split = entity.split("|");
    return {
      bucketName: split[0],
      bucketKey: split[1],
      key: split[2],
    };
  } catch (e) {
    console.log(e);
    return {
      error: e.message,
      bucketName: null,
      bucketKey: null,
      key: null,
    };
  }
};

export const isEmpty = (text: any): boolean => {
  if (text === 0) {
    return false;
  }

  if (!text) {
    return true;
  }

  if (typeof text === "object") {
    return true;
  }

  if (text.length === 0) {
    return true;
  }

  text = text.toString();

  return Boolean(!text.trim());
};

const hasOwn = {}.hasOwnProperty;

export function classNames(...args: any[]) {
  var classes = [];

  for (var i = 0; i < arguments.length; i++) {
    var arg = arguments[i];
    if (!arg) continue;

    var argType = typeof arg;

    if (argType === "string" || argType === "number") {
      classes.push(arg);
    } else if (Array.isArray(arg)) {
      if (arg.length) {
        var inner = classNames.apply(null, arg);
        if (inner) {
          classes.push(inner);
        }
      }
    } else if (argType === "object") {
      if (arg.toString !== Object.prototype.toString) {
        classes.push(arg.toString());
      } else {
        for (var key in arg) {
          if (hasOwn.call(arg, key) && arg[key]) {
            classes.push(key);
          }
        }
      }
    }
  }

  return classes.join(" ");
}

export const bytesToSize = (bytes, decimals = 2): string => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["B", "KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${(bytes / Math.pow(k, i)).toFixed(dm)} ${sizes[i]}`;
};

export const toDate = (data): string => {
  const date = new Date(data);
  return `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;
};

export const unixTimestampToDate = (unixTime): string => {
  const date = new Date(unixTime * 1000);
  return toDate(date);
};

export const getDaysFromEpoch = (epoch) => {
  const number = (epoch * 30) / DAY;
  const formatted = number.toFixed(2);
  return `${formatted} days`;
};

export const toDateSinceEpoch = (epoch) => {
  return toDate(new Date().getTime() - epoch);
};
