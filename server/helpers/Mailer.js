import nodemailer from 'nodemailer';
import dotEnv from 'dotenv';

dotEnv.config();

/**
 * @class Mailer
 */
class Mailer {
  /**
   * @memberof Mailer
   * @description Creates an instance of Mailer
   */
  constructor() {
    const {
      env: {
        GMAIL_USERNAME,
        GMAIL_PASSWORD
      }
    } = process;
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: GMAIL_USERNAME,
        pass: GMAIL_PASSWORD
      }
    });
  }

  /**
   * @method from
   * @memberof Mailer
   * @param {string} from
   * @returns { undefined }
   */
  from(from) {
    this.from = from;
  }

  /**
   * @method to
   * @memberof Mailer
   * @param {string} to
   * @returns { undefined }
   */
  to(to) {
    this.to = to;
  }

  /**
   * @method subject
   * @memberof Mailer
   * @param {string} subject
   * @returns { undefined }
   */
  subject(subject) {
    this.subject = subject;
  }

  /**
   * @method html
   * @memberof Mailer
   * @param {string} html
   * @returns { undefined }
   */
  html(html) {
    this.html = html;
  }

  /**
   * @method mailParams
   * @memberof Mailer
   * @returns { object } mailParams -mailer parameters
   */
  mailParams() {
    const {
      from,
      to,
      subject,
      html
    } = this;
    return {
      from,
      to,
      subject,
      html
    };
  }


  /**
   * @method send
   * @memberof Mailer
   * @returns {object} transporter
   */
  send() {
    return this.transporter
      .sendMail(
        this.mailParams(),
        (error, info) => {
          if (error) {
            return console.log(error.message);
          }
          return console.log('Message sent: %s', info.response);
        }
      );
  }
}

export default Mailer;