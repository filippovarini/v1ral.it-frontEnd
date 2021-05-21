/** Selects shops to be put in banner
 * @param shops list of all shops registered
 * @return array of length 20 (15 shops in 2250px, but we have length 2250 +
 *  window.innerLength)
 */

const bannerShopLength = 30;

const getShopsForBanner = shops => {
  let sortedAndFormatted = shops
    .map(shop => {
      return {
        current: shop.currentPrice,
        name: shop.name,
        logo: shop.logo,
        increase: Math.ceil((shop.currentPrice / shop.initialPrice - 1) * 100)
      };
    })
    .sort((a, b) => b.increase - a.increase);
  // repeat elements
  while (sortedAndFormatted.length < bannerShopLength) {
    sortedAndFormatted = sortedAndFormatted.concat(sortedAndFormatted);
  }
  return sortedAndFormatted.slice(0, bannerShopLength);
};

export default getShopsForBanner;
