import React from "react";
import styles from "./Footer.module.css";

const Footer: React.FC = () => {
  return (
    <footer className={styles.contact} id="footer">
      <h2>Contact Me</h2>
      <p className={styles.intro}>
        I’d love to hear from you — whether it’s a project idea, collaboration,
        or just a friendly hello.
      </p>

      <ul className={styles.infoList}>
        <li>
          <strong>Email:</strong>{" "}
          <a href="mailto:emadunan@gmail.com">emadunan@gmail.com</a>
        </li>
        <li>
          <strong>LinkedIn:</strong>{" "}
          <a
            href="https://linkedin.com/in/emadunan"
            target="_blank"
            rel="noopener noreferrer"
          >
            linkedin.com/in/emadunan
          </a>
        </li>
        <li>
          <strong>GitHub:</strong>{" "}
          <a
            href="https://github.com/emadunan"
            target="_blank"
            rel="noopener noreferrer"
          >
            github.com/emadunan
          </a>
        </li>
        <li>
          <strong>Portfolio:</strong>{" "}
          <a
            href="https://emadunan.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            emadunan.com
          </a>
        </li>
        <li>
          <strong>WhatsApp:</strong>{" "}
          <a
            href="https://wa.me/201003379933"
            target="_blank"
            rel="noopener noreferrer"
          >
            Message me on WhatsApp
          </a>
        </li>
        <li>
          <strong>Facebook:</strong>{" "}
          <a
            href="https://www.facebook.com/emadunan24"
            target="_blank"
            rel="noopener noreferrer"
          >
            Meet me in Facebook
          </a>
        </li>
        <li>
          <strong>YouTube:</strong>{" "}
          <a
            href="https://www.youtube.com/@emadunan"
            target="_blank"
            rel="noopener noreferrer"
          >
            youtube.com/@emadunan
          </a>
        </li>
        <li>
          <strong>Phone:</strong>{" "}
          <a href="tel:+201003379933">+20 100 337 9933</a>
        </li>
        <li>
          <strong>Location:</strong>
          <address>Egypt, Cairo</address>
        </li>
        <li>
          <strong>Résumé:</strong>{" "}
          <a href="/EmadYounan-CV.pdf" download>
            Download My CV (PDF)
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
