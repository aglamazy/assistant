# Server setup
## Postres database

## Private key
openssl genrsa -out private_key.pem 2048
awk 'NF {sub(/\r/, ""); printf "%s\\n",$0;}' private_key.pem | xclip -sel clip
Paste it to the .env file
JWT_PRIVATE_KEY=Ctrl-V

