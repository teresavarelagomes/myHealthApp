
export const generateComunityFilterString = (days, searchString, category) => {
    // Map each day to the filter format and join them with ' OR '
    const dayFilter = days.map(day => `dayToPublish : '${day}'`).join(' OR ');

    let filter;

    if (searchString !== undefined || searchString === '') {
      // Add the additional search string to the filter
      const additionalFilter = `title~ '*${searchString}*' OR body~ '*${searchString}*'`;

      // Combine the day filter and additional filter with 'AND'
      filter = `categories.description~ '${category}' AND (${dayFilter}) AND (${additionalFilter})`;
    } else {
      filter = `categories.description~ '${category}' AND (${dayFilter})`;
    }

    // Encode the filter string for URL
    const encodedFilter = encodeURIComponent(filter);

    return `${encodedFilter}`;
  };