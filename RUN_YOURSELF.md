# How to run the benchmark yourself

Prereqs:
- Install k6 (https://k6.io)
- Install Node 20.11.1 or higher.
- Good machine

1. Install Node dependencies
   ```sh
   npm install
   ```
2. Run a server (one of these at a time)
   ```sh
   node express/index.js
   node fastify/index.js
   node polka/index.js
   node hono/index.js
   ```
3. Run k6 script
   ```sh
   k6 run hello-world.js
   k6 run name.js
   k6 run post-body.js
   ```

## The server keeps exiting with non-zero code

See https://superuser.com/questions/361902/continuously-re-execute-a-command-when-it-finishes-in-bash.
You might want to try:
```sh
while :
do
    node hono/index.js
done
```