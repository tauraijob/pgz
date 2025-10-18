module.exports = {
    apps: [
      {
        name: 'pgz.wecode.co.zw',
        port: '3010',
        exec_mode: 'cluster',
        instances: '1',
        script: './.output/server/index.mjs',
      
      }
    ]
    }