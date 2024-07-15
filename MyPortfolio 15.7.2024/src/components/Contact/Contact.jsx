import React, { useRef, useState } from "react";
import "./Contact.css";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const form = useRef();
  const [done, setDone] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    console.log("Form submitted");

    emailjs
      .sendForm(
        "service_774i93e",
        "template_8sv2m9j",
        form.current,
        "_4auPNIud4mouhx1H"
      )
      .then(
        (result) => {
          console.log("Email sent:", result.text);
          setDone(true);
          e.target.reset(); // Resetting the form
        },
        (error) => {
          console.error("Email sending error:", error.text);
        }
      );
  };

  return (
    <div className="contact-form" id="contact">
      <div className="w-left">
        <div>
          <span className="weight">Contact me</span>
          <div
            className="blur s-blur1"
            style={{ background: "#ABF1FF94" }}
          ></div>
        </div>
      </div>
      <div className="c-right">
        <form ref={form} onSubmit={sendEmail}>
          <input type="text" name="user_name" className="user" placeholder="Name" />
          <input type="email" name="user_email" className="user" placeholder="Email" />
          <textarea name="message" className="user" placeholder="Message" />
          <input type="submit" value="Send" className="button" />
          <span>{done && "Thanks for Contacting me"}</span>
          <div
            className="blur c-blur1"
            style={{ background: "var(--purple)" }}
          ></div>
        </form>
      </div>
    </div>
  );
};

export default Contact;

