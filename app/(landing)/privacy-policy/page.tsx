import React from "react";
import Head from "next/head";

import styles from "./PrivacyPolicy.module.scss";

const COLLECT = {
  heading: "WHAT WE COLLECT",
  description: "We may collect the following information:",
  items: [
    "Name and last name",
    "contact information including email address and phone number",
    "demographic information such as preferences and interests",
  ],
};

const ACTION = {
  heading: "WHAT WE DO WITH THE INFORMATION WE GATHER",
  description:
    "We require this information to understand your needs and provide you with a better service, and in particular for the following reasons:",
  items: [
    "Internal record keeping.",
    "To improve our products and services.",
    "We may periodically send promotional emails about new products, special offers or other information which we think you may find interesting using the email address which you have provided.",
  ],
};

const PrivayPolicyPage = ({ contact }: { contact: any }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Poets Cxrner</title>
      </Head>
      <div className={styles.content}>
        <div className={styles.heading}>
          <h1>Privacy Policy</h1>
          <p>
            This privacy policy sets out how Four of Foes uses and protects any
            information that you give to Four of Foes when you use this website.
            Four of Foes is committed to ensuring that your privacy is
            protected. Should we ask you to provide certain information by which
            you can be identified when using this website, then you can be
            assured that it will only be used in accordance with this privacy
            statement. Four of Foes may change this policy from time to time by
            updating this page. You should check this page from time to time to
            ensure that you are happy with any changes.
          </p>
        </div>

        <div className={styles.section}>
          <h2>{COLLECT.heading}</h2>
          <p>{COLLECT.description}</p>
          <ul>
            {COLLECT.items.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>

        <div className={styles.section}>
          <h2>{ACTION.heading}</h2>
          <p>{ACTION.description}</p>
          <ul>
            {ACTION.items.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PrivayPolicyPage
