import * as zmq from "zeromq"

export async function server(port:number=3000, tag:string="TEST") {
  const sock = new zmq.Publisher()

  await sock.bind(`tcp://127.0.0.1:${port}`)
  console.log(`Publisher bound to port ${port}`)
  let c = 0;
  while (true) {
    console.log(`sending a multipart message ${c}`)
    await sock.send([tag, `hello ${c}`]);
    await new Promise(resolve => {
      setTimeout(resolve, 1500)
      c += 1;
    });
    if (c > 100) {
      break;
    }
  }
}


export async function client(port:number=3000) {
  const sock = new zmq.Subscriber()

  sock.connect(`tcp://127.0.0.1:${port}`)
  sock.subscribe('')
  console.log("Subscriber connected to port 3000")
  let c = 0;
  for await (const [topic, msg] of sock) {
    console.log(
      `received a message ${c} related to:`,
      ''+topic,
      "containing message:",
      ''+msg,
    );
    c += 1;
    if (c > 100) {
      break;
    }
  }
}
