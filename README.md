# this was set up from 
# how to reproduce
 - `cd ZMQTest`
 - `npm install`
 - start two shells and
   - `npx tsx tests/zmq-client.ts`
   - `npx tsx tests/zmq-server.ts`
 - `npm run dev`
   - the working code in tests/zmq-bug.ts makes main process barf