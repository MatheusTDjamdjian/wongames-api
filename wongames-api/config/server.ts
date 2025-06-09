export default ({ env }) => {
  console.log('APP_KEYS array:', env.array('APP_KEYS'));
  return {
    host: env('HOST', '0.0.0.0'),
    port: env.int('PORT', 1337),
    app: {
      keys: env.array('APP_KEYS'),
    },
  };
};