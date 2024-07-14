export const smsHandler = async (mobileNumber, message) => {
  try {
    const res = await fetch("https://api.limosms.com/api/sendpeertopeersms", {
      method: "POST",
      headers: {
        ApiKey: process.env.SMS_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Message: [message],
        SenderNumber: "10000000002027",
        MobileNumber: [mobileNumber],
      }),
    });
    const data = await res.json();
    return data;
  } catch (err) {
    return err;
  }
};

export const sendAuthCode = async (Mobile) => {
  try {
    const res = await fetch("https://api.limosms.com/api/sendcode", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        ApiKey: process.env.SMS_KEY,
      },
      body: JSON.stringify({
        Mobile,
        Footer: "welcome to GameOn!",
      }),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return { success: false, message: "sms panel is disconnected" };
  }
};

export const verifyAuthCode = async (Mobile, Code) => {
  try {
    const res = await fetch("https://api.limosms.com/api/checkcode", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        ApiKey: process.env.SMS_KEY,
      },
      body: JSON.stringify({
        Mobile,
        Code,
      }),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return { success: false, message: "sms panel is disconnected" };
  }
};
