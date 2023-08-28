Prepare

- Push Source code to github
- Create AWS EC2 Instance and Open connection
- Install nvm, git, nginx, pm2

* https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-up-node-on-ec2-instance.html
* sudo yum install git
* sudo yum install nginx
* npm install pm2@latest -g

- open url to check nginx
- Pull code from github

Deploy Backend

- cd to folder source code
- npm install
- pm2 start "npm run server" --name json-server
- Open Edit nginx config file: sudo nano /etc/nginx/nginx.conf
- add: location /api {
  proxy_pass http://127.0.0.1:3005;
  }
- restart nginx: sudo service nginx restart
- verify api

Deploy Frontend

- update endpoint api, commit code to github
- connect to ec2, pull code from github
- Pull code from github
- cd to folder source code
- npm install
- npm run build
- Open Edit nginx config file: sudo nano /etc/nginx/nginx.conf
- update: root /home/ec2-user/${PROJECT_NAME}/build;
  index index.html index.htm;
- add: location / {
  try_files $uri /index.html;
  }
- grant permission to access folder code: sudo chmod 755 /home
- restart nginx: sudo service nginx restart
- verify frontend
