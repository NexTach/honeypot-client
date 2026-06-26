export const setCookie = (name: string, value: string): void => {
  if (typeof document === 'undefined') return;

  const secureAttr = window.location.protocol === 'https:' ? '; secure' : '';
  document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; path=/; samesite=Lax${secureAttr}`;
};

export const getCookie = (name: string): string | null => {
  if (typeof document === 'undefined') return null;

  const nameEQ = `${encodeURIComponent(name)}=`;
  for (const cookie of document.cookie.split(';')) {
    const c = cookie.trim();
    if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length));
  }

  return null;
};

export const deleteCookie = (name: string): void => {
  if (typeof document === 'undefined') return;

  const secureAttr = window.location.protocol === 'https:' ? '; secure' : '';
  document.cookie = `${encodeURIComponent(name)}=; path=/; samesite=Lax; expires=Thu, 01 Jan 1970 00:00:00 GMT${secureAttr}`;
};
