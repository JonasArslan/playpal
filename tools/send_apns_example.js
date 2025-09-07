// Minimal APNs HTTP/2 sender using apns2 (node-apn alternatives deprecated). Install deps:
// npm i apns2 --save-dev
// Usage: node tools/send_apns_example.js <p8Path> <keyId> <teamId> <bundleId> <deviceToken>

const { APNsClient, Notification } = require('apns2');
const fs = require('fs');

async function main() {
  const [p8Path, keyId, teamId, bundleId, deviceToken] = process.argv.slice(2);
  if (!p8Path || !keyId || !teamId || !bundleId || !deviceToken) {
    console.error('Usage: node tools/send_apns_example.js <p8Path> <keyId> <teamId> <bundleId> <deviceToken>');
    process.exit(1);
  }
  const key = fs.readFileSync(p8Path, 'utf8');
  const client = new APNsClient({ team: teamId, keyId, key, production: false });

  const note = new Notification(deviceToken, {
    aps: {
      alert: { title: 'PlayPal Test', body: 'Hello from APNs!' },
      sound: 'default',
    },
  });

  note.topic = bundleId;

  try {
    const res = await client.send(note);
    console.log('APNs response:', res);
  } catch (e) {
    console.error('APNs error:', e);
    process.exit(1);
  }
}

main();
