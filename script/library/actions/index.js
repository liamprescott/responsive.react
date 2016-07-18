

export const ACTIONS = {
  SET_DEVICE_FORMAT: 'SET_DEVICE_FORMAT',
};


export function setDeviceFormat(deviceFormat) {
  return {
    type: ACTIONS.SET_DEVICE_FORMAT,
    payload: { deviceFormat },
  };
}
