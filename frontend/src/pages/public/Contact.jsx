function Contact() {
  return (
    <section className="contact-page">
      <div className="container">

        <div className="contact-hero">
          <span className="contact-badge">
            📞 Get in Touch
          </span>

          <h1>
            Contact SRK Institute of Technology
          </h1>

          <p>
            For assistance regarding examinations, academic records,
            ResultX portal access, or other institutional services,
            please contact the appropriate department. We are committed
            to providing timely support to students, faculty, and staff.
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