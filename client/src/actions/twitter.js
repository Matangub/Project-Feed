
/* MAIN FEED OF THE APPLICATION */
export function getFeed(socialProvider) {

  return {
    type: 'GET_HOME_FEED',
    provider: socialProvider
  }
}
