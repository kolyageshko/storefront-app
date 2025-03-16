/**
 * Разделяет locale на язык и регион.
 * @param {string | undefined} locale - Строка locale в формате "en-us".
 * @returns {[string, string]} Массив, содержащий язык и регион.
 */
export const splitLocale = (locale?: string): [string, string] => {
    return locale ? locale.split('-') as [string, string] : ['en', 'us'];
};
