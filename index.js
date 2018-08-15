// logger
// 1st argument = error
// 2nd argument = options || message || function
// 3rd argument = function to execute || arguments to pass to function
// 4th to nth argument = arguments for the function to execute.

// options = {
//   message: '' default = 'LOGGER'
//   type: 'log', 'error', 'info', 'warn', etc; default = log
//   timestamp: Boolean default = true
//   newline: Boolean default = true
//   footer: String default = ''
// }

const log = (logme, head, use, timestamp, newline, footer) => {
  const ts = timestamp ? `${new Date().toLocaleString()}\n` : "";
  const h = head ? head : "";
  const nl = newline === false ? "" : "\n";
  const f = footer ? `\n${footer}` : "";
  const logMeAr = [nl, h, ts, logme, f].filter(i => i !== "");
  console[use](...logMeAr);
};

// arguments object is array like but not one so ..
const getArguments = (argsObj, sliceFrom) => {
  const args = Array.from(argsObj);
  return args.slice(sliceFrom);
};

function logger(logme, options, func) {
  if (logme) {
    let head = "LOGGER:";
    let use = "log";
    let tstamp = true;
    let nline = true;
    if (typeof options === "string") {
      // if message is directly passed as the second argument.
      log(logme, head, use, tstamp, nline);
      if (typeof func === "function") {
        func(...getArguments(arguments, 3));
        return;
      } else {
        return;
      }
    } else if (typeof options === "object") {
      // if options object is passed as the second argument.
      const { message, type, timestamp, newline, footer } = options;
      // check the options and send inferred values to log().
      use = type === "log" || type === "error" || type === "warn" || type === "info" ? type : "log";
      head = message ? `${message}\n` : message === "" ? message : message === false ? false : head;
      tstamp = timestamp === false ? false : true;
      nline = newline === false ? false : true;

      log(logme, head, use, tstamp, nline, footer);

      if (typeof func === "function") {
        func(...getArguments(arguments, 3));
        return;
      } else {
        return;
      }
    } else if (typeof options === "function") {
      // if no message or options but a function is passed as the second argument
      log(logme, head, use, tstamp, nline);
      options(...getArguments(arguments, 2));
      return;
    } else {
      // if no second argument.
      log(logme, head, use, tstamp, nline);
      return;
    }
  } else {
    return;
  }
}

module.exports = logger;
