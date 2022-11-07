module.exports = {
    async redirects() {
      return [
        {
          source: '/auth/register/student',
          destination: '/',
          permanent: true,
        },
      ]
    },
  }
  