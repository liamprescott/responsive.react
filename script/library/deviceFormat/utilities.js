

function formatMediaQuery(settings) {
  return Object.keys(settings).map((key) => `(${key}:${settings[key]})`).join(' and ');
}


export const deviceFormats = {
  xsmall: 'xsmall',
  small: 'small',
  medium: 'medium',
  large: 'large',
  xlarge: 'xlarge',
};


export const deviceFormatScale = {
  [deviceFormats.xsmall]: 1,
  [deviceFormats.small]: 2,
  [deviceFormats.medium]: 3,
  [deviceFormats.large]: 4,
  [deviceFormats.xlarge]: 5,
};


const base = 16;

function pxToEm(px) {
  return px / base;
}
// export const dFQs = {
//   [deviceFormats.xsmall]: `${480 / base}em`,
//   [deviceFormats.small]: `${640 / base}em`,
//   [deviceFormats.medium]: `${1024 / base}em`,
//   [deviceFormats.large]: `${1440 / base}em`,
//   [deviceFormats.xlarge]: `${1920 / base}em`,
// };


export const deviceFormatQueries = [
  {
    name: deviceFormats.xsmall,
    value: `${480 / base}em`,
  },
  {
    name: deviceFormats.small,
    value: `${640 / base}em`,
  },
  {
    name: deviceFormats.medium,
    value: `${1024 / base}em`,
  },
  {
    name: deviceFormats.large,
    value: `${1440 / base}em`,
  },
  {
    name: deviceFormats.xlarge,
    value: `${1920 / base}em`,
  },
];


function handleDeviceFormatChange(q, queryName, dispatch, updateAction) {
  // console.log(`${q} : ${q.matches} : ${q.media}: queryName = ${queryName} type = ${typeof queryName}`); // : ${dispatch}
  if (q.matches) {
    // Get query ID and dispatch action
    dispatch(updateAction(queryName));
  }
}


//
//
// IMPORTANT - ONLY get notifications when a mediaQueryList CHANGES
//
// i.e. Transitioning UP from a small min-width query(a) to a larger min-width query (b) means that only (b) fires.
// And when returning back DOWN to the small query (a) ONLY (b) fire because only (b) has changed - (a) as ALWAYS
// been valid / active!!
//
//
export function setupFormatListeners(formatQueries, dispatch, updateAction) {
  // Add match media listeners and configure such that they have access to dispatch
  const mediaQueryLists = {};

  formatQueries.forEach((query, i, queries) => {
    const settings = { 'min-width': query.value };

    // Need to format a min - max media query string here!!!
    if (i !== queries.length - 1) settings['max-width'] = `${parseInt(queries[i + 1].value, 10) - pxToEm(1)}em`;

    const mq = mediaQueryLists[query.name] = window.matchMedia(formatMediaQuery(settings));
    mq.addListener((q) => { handleDeviceFormatChange(q, query.name, dispatch, updateAction); });
    // Invoke the listener directly once for each query for initial configuration
    handleDeviceFormatChange(mq, query.name, dispatch, updateAction);
    // console.log(`${query.name} - Formatted query: ${formatMediaQuery(settings)} // mq.media: ${mq.media} // mq.matches: ${mq.matches}`);
  });

  return mediaQueryLists;
}


export function isUpto(a, b) {
  return deviceFormatScale[a] <= deviceFormatScale[b];
}


export function isLessThan(a, b) {
  return deviceFormatScale[a] < deviceFormatScale[b];
}


export function isFrom(a, b) {
  return deviceFormatScale[a] >= deviceFormatScale[b];
}


export function isBetween(a, b, c) {
  const current = deviceFormatScale[a];
  return current >= deviceFormatScale[b] && current <= deviceFormatScale[c];
}
