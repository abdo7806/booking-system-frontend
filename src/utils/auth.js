// src/utils/auth.js
export const getUser = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {

		       const base64Url = token.split('.')[1];
        if (!base64Url) throw new Error('Invalid token format');

        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const decodedData = atob(base64);

        const jsonPayload = decodeURIComponent(
            decodedData.split('')
            .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join('')
        );


    return JSON.parse(jsonPayload);
  } catch (err) {
    return null;
  }
};

export const isAuthenticated = () => !!getUser();

export const hasRole = (role) => {
  const user = getUser();
	
  return user?.role === role;
};