async function verifyDocument() {

  const random = Math.random();

  if (random < 0.4) {
    throw new Error("External dependency failure");
  }

  return true;

}

async function retryVerify(maxRetries = 3) {

  let attempts = 0;

  while (attempts < maxRetries) {

    try {
      return await verifyDocument();
    }
    catch (err) {

      attempts++;

      if (attempts === maxRetries) {
        throw err;
      }

    }

  }

}

module.exports = retryVerify;