export function capitalize(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  
  export function truncate(str, maxLength = 10, suffix = '...') {
    if (str.length <= maxLength) return str;
    return str.slice(0, maxLength) + suffix;
  }
  
  export default {
    capitalize,
    truncate
  };