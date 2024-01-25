import bowser from 'bowser';
import {memoize} from 'lodash';
import window from 'global/window';

export const getBrowserSerial = () => {
  let browserData;
  try {
    browserData = window?.navigator?.userAgent
      ? bowser.getParser(window.navigator.userAgent)
      : {error: 'unable to access window.navigator.userAgent'};
  } catch (err) {
    browserData = {error: err.message};
  }

  return browserData;
};

const mockDetectionObject = {
  /* eslint-disable global-require */
  getOSName: () => require('os').platform(),
  getOSVersion: () => require('os').release(),
  /* eslint-enable global-require */
  getBrowserName: () => '',
  getBrowserVersion: () => '',
  isBrowser: () => false,
};

const createDetectionObject = (results) => {
  const getOSName = () => results?.getOSName() ?? '';
  const getOSVersion = () => results?.getOSVersion() ?? '';

  const getBrowserName = () => results?.getBrowserName() ?? '';
  const getBrowserVersion = () => results?.getBrowserVersion() ?? '';

  const isBrowser = (name) => !!results?.isBrowser(name, true);

  return {
    getOSName,
    getOSVersion,
    getBrowserName,
    getBrowserVersion,
    isBrowser,
  };
};

export default memoize((agent) =>
  agent || window.navigator?.userAgent
    ? createDetectionObject(bowser.getParser(agent || window.navigator.userAgent))
    : mockDetectionObject
);
