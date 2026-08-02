function Contact() {
  return (
    <section className="contact-page">
      <div className="container">

        <div className="contact-hero">
          <span className="contact-badge">
            📞 Contact Us
          </span>

          <h1>
            We'd Love to <span>Hear From You</span>
          </h1>

          <p>
            Have questions, feedback, or need technical assistance?
            Reach out to the ResultX team. We're here to help you.
          </p>
        </div>

        <div className="contact-grid">

          <div className="contact-card">
            <div className="contact-icon">
              📧
            </div>

            <h3>Email</h3>

            <p>
              support@resultx.com
            </p>
          </div>

          <div className="contact-card">
            <div className="contact-icon">
              📞
            </div>

            <h3>Phone</h3>

            <p>
              +91 98765 43210
            </p>
          </div>

          <div className="contact-card">
            <div className="contact-icon">
              📍
            </div>

            <h3>Address</h3>

            <p>
              SRK Institute of Technology
              <br />
              Vijayawada, Andhra Pradesh
            </p>
          </div>

        </div>

        <div className="contact-form-card">

          <h2>Send us a Message</h2>

          <form className="contact-form">

            <input
              type="text"
              placeholder="Your Name"
            />

            <input
              type="email"
              placeholder="Your Email"
            />

            <input
              type="text"
              placeholder="Subject"
            />

            <textarea
              rows="5"
              placeholder="Your Message"
            />

            <button
              type="submit"
              className="dashboard-btn"
            >
              Send Message
            </button>

          </form>

        </div>

      </div>
    </section>
  );
}

export default Contact;