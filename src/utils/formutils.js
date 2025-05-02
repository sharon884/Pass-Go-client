/**
 * Utility functions for handling form data, particularly nested objects
 */

/**
 * Flattens a nested object structure into a single-level object with dot notation keys
 * @param {Object} obj - The object to flatten
 * @param {string} prefix - Optional prefix for the keys
 * @return {Object} - Flattened object
 */
export const flattenObject = (obj, prefix = '') => {
    return Object.keys(obj).reduce((acc, key) => {
      const prefixKey = prefix ? `${prefix}.${key}` : key;
      
      if (typeof obj[key] === 'object' && obj[key] !== null && !(obj[key] instanceof File) && !(obj[key] instanceof Date) && !Array.isArray(obj[key])) {
        Object.assign(acc, flattenObject(obj[key], prefixKey));
      } else {
        acc[prefixKey] = obj[key];
      }
      
      return acc;
    }, {});
  };
  
  /**
   * Converts a data object to FormData with proper handling of nested objects
   * @param {Object} data - The data object to convert
   * @return {FormData} - FormData object with all values properly added
   */
  export const objectToFormData = (data) => {
    const formData = new FormData();
    const flattenedData = flattenObject(data);
    
    Object.entries(flattenedData).forEach(([key, value]) => {
      // Skip null or undefined values
      if (value === null || value === undefined) {
        return;
      }
      
      // Handle array values separately
      if (Array.isArray(value)) {
        if (value.length === 0) {
          formData.append(`${key}`, '[]');
        } else if (value[0] instanceof File) {
          // For file arrays, append each file with the same key
          value.forEach((file) => {
            formData.append(key, file);
          });
        } else {
          // For other arrays, stringify
          formData.append(key, JSON.stringify(value));
        }
      }
      // Handle Date objects
      else if (value instanceof Date) {
        formData.append(key, value.toISOString());
      }
      // Handle File objects
      else if (value instanceof File) {
        formData.append(key, value);
      }
      // Handle other objects by stringifying
      else if (typeof value === 'object') {
        formData.append(key, JSON.stringify(value));
      }
      // Handle primitive values
      else {
        formData.append(key, String(value));
      }
    });
    
    return formData;
  };
  