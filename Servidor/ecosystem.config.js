module.exports = {
  apps : [{
    name: 'La bonita',
    script: './index.js',
    watch: true,
    env: { 
    	NODE_ENV: 'production',
 	PORT: 3000, 
 	DBHOST: 'localhost',
 	DBUSER: 'labonita',
 	DBPASS: 'Jmgl2920.',
 	DBNAME: 'labonita'
    }
  }] 
};
