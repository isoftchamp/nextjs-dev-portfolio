export async function POST(req: Request) {
  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ success: false, message: "Only POST requests allowed" }),
      { status: 405 }
    );
  }

  const params = await req.json();
  const { token } = params;
  const secretKey: string = process.env.RECAPTCHA_SECRET_KEY || "";

  if (!token) {
    return new Response(
      JSON.stringify({ success: false, message: "Token not found" }),
      { status: 405 }
    );
  }

  try {
    // Check if the recaptcha token is valid
    const res = await fetch(
      "https://www.google.com/recaptcha/api/siteverify?" +
        new URLSearchParams({ secret: secretKey, response: token }).toString(),
      {
        method: "POST",
      }
    );
    const data = await res.json();

    if (!data.success) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Captcha verification failed!",
        }),
        {
          status: 405,
        }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Captcha verified successfully!",
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, message: "Internal Server Error" }),
      { status: 500 }
    );
  }
}
