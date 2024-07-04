"use client";
// @flow strict
import { useState, useRef } from "react";
import { TbMailForward } from "react-icons/tb";
import { toast } from "react-toastify";
import ReCAPTCHA from "react-google-recaptcha";

import { isValidEmail } from "@/app/lib/utils/check-email";
import { personalData } from "@/app/lib/data/personal";
import { sendMail } from "@/app/lib/actions";
import type { DictionaryType, ServerResType } from "@/app/lib/data/definitions";

export default function ContactWithCaptcha() {
  const FORM_DEFAULT: DictionaryType = {
    to_name: personalData.nickName,
    from_name: "",
    message: "",
    reply_to: "",
    token: "",
  };

  const [input, setInput] = useState(FORM_DEFAULT);
  const [error, setError] = useState({
    reply_to: false,
    required: false,
  });
  const [isSending, setIsSending] = useState(false);

  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const checkRequired = () => {
    if (input.reply_to && input.message && input.from_name) {
      setError({ ...error, required: false });
    }
  };

  const handleSendMessage = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (!input.token) {
      toast.error("Please complete the captcha!");
      return;
    }

    if (!input.reply_to || !input.message || !input.reply_to) {
      setError({ ...error, required: true });
      return;
    } else if (error.reply_to) {
      return;
    } else {
      setError({ ...error, required: false });
    }

    setIsSending(true);
    const res: ServerResType = await sendMail(input);
    if (res.success) {
      toast.success(res.message);
      setInput(FORM_DEFAULT);
      recaptchaRef.current?.reset();
    } else {
      toast.error(res.message);
    }
    setIsSending(false);
  };

  return (
    <div>
      <p className="font-medium mb-5 text-[#16f2b3] text-xl uppercase">
        Contact with me
      </p>
      <div className="max-w-3xl text-white rounded-lg border border-[#464c6a] p-3 lg:p-5">
        <p className="text-sm text-[#d3d8e8]">
          {
            "If you have any questions or concerns, please don't hesitate to contact me. I am open to any work opportunities that align with my skills and interests."
          }
        </p>
        <div className="mt-6 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-base">Your Name: </label>
            <input
              className="bg-[#10172d] w-full border rounded-md border-[#353a52] focus:border-[#16f2b3] ring-0 outline-0 transition-all duration-300 px-3 py-2"
              type="text"
              maxLength={100}
              required={true}
              onChange={(e) =>
                setInput({ ...input, from_name: e.target.value })
              }
              onBlur={checkRequired}
              value={input.from_name}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-base">Your Email: </label>
            <input
              className="bg-[#10172d] w-full border rounded-md border-[#353a52] focus:border-[#16f2b3] ring-0 outline-0 transition-all duration-300 px-3 py-2"
              type="email"
              maxLength={100}
              required={true}
              value={input.reply_to}
              onChange={(e) => setInput({ ...input, reply_to: e.target.value })}
              onBlur={() => {
                checkRequired();
                setError({ ...error, reply_to: !isValidEmail(input.reply_to) });
              }}
            />
            {error.reply_to && (
              <p className="text-sm text-red-400">
                Please provide a valid email!
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-base">Your Message: </label>
            <textarea
              className="bg-[#10172d] w-full border rounded-md border-[#353a52] focus:border-[#16f2b3] ring-0 outline-0 transition-all duration-300 px-3 py-2"
              maxLength={500}
              name="message"
              required={true}
              onChange={(e) => setInput({ ...input, message: e.target.value })}
              onBlur={checkRequired}
              rows={4}
              value={input.message}
            />
          </div>
          <ReCAPTCHA
            sitekey={
              process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "NOT DEFINED"
            }
            ref={recaptchaRef}
            size="normal" // invisible | normal
            onChange={(code) => setInput({ ...input, token: code || "" })}
            onExpired={() => setInput({ ...input, token: "" })}
            asyncScriptOnLoad={() =>
              console.log("Google recaptcha loaded just fine")
            }
          />
          <div className="flex flex-col items-center gap-2">
            {error.required && (
              <p className="text-sm text-red-400">
                Email and Message are required!
              </p>
            )}
            <button
              disabled={isSending}
              className="flex items-center gap-1 hover:gap-3 rounded-full bg-gradient-to-r from-pink-500 to-violet-600 px-5 md:px-12 py-2.5 md:py-3 text-center text-xs md:text-sm font-medium uppercase tracking-wider text-white no-underline transition-all duration-200 ease-out hover:text-white hover:no-underline md:font-semibold"
              role="button"
              onClick={handleSendMessage}
            >
              <span>Send Message</span>
              <TbMailForward className="mt-1" size={18} />
              {isSending && "Sending..."}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
