const getConfig = () => {
  switch (process.env.NODE_ENV) {
    case 'production':
      return {
        baseURL: ''
      };
    case 'development':
      return {
        baseURL: 'https://localhost:44303'
      };
    default:
      return {
        baseURL: 'https://localhost:44303'
      };
  }
};

export default getConfig;