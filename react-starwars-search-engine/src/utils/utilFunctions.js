import axios from 'axios';

export const throttle = (func, ms) => {
  let isThrottled = false;
  let savedArgs;
  let savedThis;

  function wrapper() {
    if (isThrottled) {
      savedArgs = arguments;
      savedThis = this;
      return;
    }

    func.apply(this, arguments);

    isThrottled = true;

    setTimeout(function () {
      isThrottled = false;
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs);
        savedArgs = savedThis = null;
      }
    }, ms);
  }

  return wrapper;
};

export const extractPersonId = (url) => {
  return url.match(/\/([^\/]+)\/?$/)[1];
};

export const getDataFromUrls = async (
  urls,
  setMethod,
  dataProperty = 'name'
) => {
  try {
    if (!urls) return;

    let response;
    if (typeof urls === 'object') {
      response = await Promise.all(
        urls.map(async (url) => await axios.get(url))
      );
    } else {
      response = await axios.get(urls);
    }

    if (!response) return;
    let data = response.data;
    if (typeof urls === 'object') {
      data = response.map((res) => res.data[dataProperty]);
    }
    setMethod(data);
  } catch (err) {
    console.error('Error', err);
  }
};
