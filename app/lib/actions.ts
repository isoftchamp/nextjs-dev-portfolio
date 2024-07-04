import { unstable_noStore as noStore } from "next/cache";
import { BlogType } from "./data/definitions";
import type { DictionaryType, ServerResType } from "@/app/lib/data/definitions";
import emailjs from "@emailjs/browser";

export async function getBlogs(all: boolean = false): Promise<BlogType[]> {
  noStore();

  try {
    const res = await fetch("https://dev.to/api/articles?username=xuanmingl");
    const data = await res.json();

    if (!all) {
      const filtered = data
        .filter((item: BlogType) => item?.cover_image)
        .sort((a: BlogType, b: BlogType) =>
          a.published_at > b.published_at
            ? -1
            : a.published_at < b.published_at
            ? 1
            : 0
        );
      return filtered;
    }

    return data;
  } catch (error) {
    throw new Error("Failed to fetch blog data");
  }
}

export async function sendMail(params: DictionaryType): Promise<ServerResType> {
  noStore();

  try {
    const res = await fetch("/api/server", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });
    const data: ServerResType = await res.json();

    // ===== START ===== In case of calling email js from client side
    if (data.success) {
      delete params.token;
      const resp = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "",
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "",
        params,
        { publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY }
      );

      if (resp.status === 200) {
        return { success: true, message: "Message sent successfully!" };
      } else {
        return { success: false, message: "Failed to send email!" };
      }
    } else {
      return { success: false, message: data.message };
    }
    // ===== END ===== In case of calling email js from client side
  } catch (error) {
    // throw new Error('Failed to fetch blog data.');
    return { success: false, message: error as string };
  }
}
