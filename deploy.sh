rm -rf public/*
hugo
#scp -i ~/linode_rsa.key -r public/* root@xiaotiandai.com:/www/html/homepage
rsync -Pav -e "ssh -i $HOME/linode_rsa.key" public/ root@xiaotiandai.com:/www/html/homepage
